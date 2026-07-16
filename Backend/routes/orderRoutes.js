import express from 'express';
import { 
  addOrderItems, 
  getSellerOrders, 
  updateOrderStatus, 
  getUserOrders,
  getAvailableForDelivery,
  getDeliveryBoyOrders,
  assignDeliveryBoy,
  getAllOrders
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(getAllOrders);
router.route('/available-for-delivery').get(getAvailableForDelivery);
router.route('/seller/:id').get(getSellerOrders);
router.route('/user/:id').get(getUserOrders);
router.route('/delivery-boy/:id').get(getDeliveryBoyOrders);
router.route('/:id/assign').put(assignDeliveryBoy);
router.route('/:id/status').put(updateOrderStatus);

export default router;
