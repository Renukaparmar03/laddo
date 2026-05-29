import express from 'express';
import {
  authSeller,
  registerSeller,
  logoutSeller,
  getSellerProfile,
  getAllSellers,
  updateSellerStatus
} from '../controllers/sellerController.js';
import { protectSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerSeller).get(getAllSellers);
router.post('/auth', authSeller);
router.post('/logout', logoutSeller);
router.route('/profile').get(protectSeller, getSellerProfile);
router.route('/:id/status').put(updateSellerStatus);

export default router;
