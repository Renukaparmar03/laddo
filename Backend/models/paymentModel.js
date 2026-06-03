import mongoose from 'mongoose';

/**
 * Payment Model
 * Stores Razorpay payment transaction details.
 * Each document links a Razorpay order/payment to a MongoDB Order document.
 */
const paymentSchema = mongoose.Schema(
  {
    // Reference to the internal Order document(s).
    // An array because one cart checkout can create multiple seller-split orders.
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],

    // The user who made the payment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // ─── Razorpay identifiers ────────────────────────────────────────────────

    // razorpay_order_id returned by Razorpay when creating an order
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },

    // razorpay_payment_id returned after successful payment (set during verification)
    razorpayPaymentId: {
      type: String,
      default: null,
    },

    // razorpay_signature returned after successful payment (set during verification)
    razorpaySignature: {
      type: String,
      default: null,
    },

    // ─── Payment details ─────────────────────────────────────────────────────

    // Amount in the smallest currency unit (paise for INR). e.g. ₹100 = 10000
    amount: {
      type: Number,
      required: true,
    },

    // ISO 4217 currency code, default INR
    currency: {
      type: String,
      default: 'INR',
    },

    // Payment status lifecycle
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },

    // Human-readable receipt tag sent to Razorpay
    receipt: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
