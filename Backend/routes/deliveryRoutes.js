import express from 'express';
import {
  registerDelivery,
  authDelivery,
  getDeliveries,
  updateDeliveryStatus,
  resetPassword
} from '../controllers/deliveryController.js';

const router = express.Router();

router.post('/register', registerDelivery);
router.post('/login', authDelivery);
router.route('/').get(getDeliveries);
router.route('/reset-password').put(resetPassword);
router.route('/:id/status').put(updateDeliveryStatus);

export default router;
