import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/paymentModel.js';
import Order from '../models/orderModel.js';

// ─────────────────────────────────────────────────────────────────────────────
// Razorpay factory — creates a fresh instance every call so it always reads
// the current process.env values (safe since dotenv.config() runs at startup).
// Do NOT cache the instance — if .env changes and server restarts, stale cached
// instances with wrong keys would cause 500 errors.
// ─────────────────────────────────────────────────────────────────────────────
const getRazorpay = () => {
  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes('XXXX') || keySecret.includes('XXXX')) {
    throw new Error('Razorpay keys are missing or still set to placeholder values in .env');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Create a Razorpay order (called before showing the payment popup)
// @route   POST /api/payments/create-order
// @access  Public (can be Protected if needed)
//
// Request body:
//   amount      {Number}  – total in INR (₹). Will be converted to paise.
//   currency    {String}  – optional, defaults to "INR"
//   orderIds    {Array}   – MongoDB Order _id values created just before payment
//   userId      {String}  – MongoDB User _id
// ─────────────────────────────────────────────────────────────────────────────
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', orderIds = [], userId } = req.body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'A valid amount is required' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Convert rupees → paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(Number(amount) * 100);

    // Generate a short unique receipt tag (max 40 chars allowed by Razorpay)
    const receipt = `rcpt_${Date.now().toString().slice(-10)}`;

    // Options for Razorpay order creation
    // NOTE: payment_capture is deprecated in newer SDK — omit it.
    const razorpayOptions = {
      amount: amountInPaise,
      currency,
      receipt,
    };

    // Create order on Razorpay's servers
    const razorpayOrder = await getRazorpay().orders.create(razorpayOptions);

    // Persist a Payment record in our database (status = 'created')
    const payment = await Payment.create({
      orders: orderIds,        // link to internal Order documents
      user: userId,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency,
      receipt,
      status: 'created',
    });

    // Return everything the frontend Razorpay checkout needs
    return res.status(201).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,       // in paise
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // safe to expose (not the secret)
      paymentDbId: payment._id,           // our DB record id
      receipt,
    });
  } catch (error) {
    console.error('createRazorpayOrder error:', error);
    return res.status(500).json({ message: error.message || 'Failed to create Razorpay order' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Verify Razorpay payment signature after successful payment
// @route   POST /api/payments/verify
// @access  Public
//
// Request body:
//   razorpay_order_id   {String} – from Razorpay checkout response
//   razorpay_payment_id {String} – from Razorpay checkout response
//   razorpay_signature  {String} – from Razorpay checkout response
// ─────────────────────────────────────────────────────────────────────────────
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Validate all three fields are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'razorpay_order_id, razorpay_payment_id and razorpay_signature are all required',
      });
    }

    // ── Signature verification ────────────────────────────────────────────────
    // Razorpay signs the payload as:
    //   HMAC-SHA256( razorpay_order_id + "|" + razorpay_payment_id , key_secret )
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      // Mark payment as failed in our DB
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed', razorpayPaymentId: razorpay_payment_id }
      );
      return res.status(400).json({ success: false, message: 'Payment verification failed. Invalid signature.' });
    }

    // ── Signature is valid — update our records ───────────────────────────────

    // Update the Payment document
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    // Mark all linked Order documents as paid
    // Only update fields that exist in the Order schema.
    if (payment.orders && payment.orders.length > 0) {
      await Order.updateMany(
        { _id: { $in: payment.orders } },
        {
          isPaid: true,
          paidAt: new Date(),
          paymentMethod: 'Razorpay',
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentDbId: payment._id,
    });
  } catch (error) {
    console.error('verifyPayment error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Payment verification failed' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get payment details by Razorpay order ID
// @route   GET /api/payments/:razorpayOrderId
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
export const getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findOne({ razorpayOrderId: req.params.razorpayOrderId })
      .populate('orders')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    return res.status(200).json(payment);
  } catch (error) {
    console.error('getPaymentDetails error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all payments for a user
// @route   GET /api/payments/user/:userId
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId })
      .populate('orders')
      .sort({ createdAt: -1 });

    return res.status(200).json(payments);
  } catch (error) {
    console.error('getUserPayments error:', error);
    return res.status(500).json({ message: error.message });
  }
};
