import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  resetPassword,
  resetPasswordAdmin
} from '../controllers/userController.js';
import { protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(getAllUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.put('/reset-password', resetPassword);
router.put('/reset-password-admin', resetPasswordAdmin);
router.route('/profile').get(protectUser, getUserProfile).put(protectUser, updateUserProfile);

export default router;
