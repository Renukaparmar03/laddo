import express from 'express';
import {
  createRazorpayOrder,
  verifyPayment,
  getPaymentDetails,
  getUserPayments,
} from '../controllers/paymentController.js';

const router = express.Router();

/**
 * POST /api/payments/create-order
 * Step 1 – Call this before showing the Razorpay checkout popup.
 * Body: { amount, currency?, orderIds[], userId }
 */
router.post('/create-order', createRazorpayOrder);

/**
 * POST /api/payments/verify
 * Step 2 – Call this after the user completes payment in the Razorpay popup.
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
router.post('/verify', verifyPayment);

/**
 * GET /api/payments/:razorpayOrderId
 * Fetch a single payment record by Razorpay order ID.
 */
router.get('/:razorpayOrderId', getPaymentDetails);

/**
 * GET /api/payments/user/:userId
 * Fetch all payment records for a specific user.
 */
router.get('/user/:userId', getUserPayments);

export default router;
