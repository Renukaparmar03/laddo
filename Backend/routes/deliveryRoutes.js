import express from 'express';
import {
  registerDelivery,
  authDelivery,
  getDeliveries,
  updateDeliveryStatus,
} from '../controllers/deliveryController.js';

const router = express.Router();

router.post('/register', registerDelivery);
router.post('/login', authDelivery);
router.route('/').get(getDeliveries);
router.route('/:id/status').put(updateDeliveryStatus);

export default router;
