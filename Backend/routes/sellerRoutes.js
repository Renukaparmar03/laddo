import express from 'express';
import {
  authSeller,
  registerSeller,
  logoutSeller,
  getSellerProfile,
} from '../controllers/sellerController.js';
import { protectSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerSeller);
router.post('/auth', authSeller);
router.post('/logout', logoutSeller);
router.route('/profile').get(protectSeller, getSellerProfile);

export default router;
