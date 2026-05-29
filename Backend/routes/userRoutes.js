import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getAllUsers,
} from '../controllers/userController.js';
import { protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(getAllUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protectUser, getUserProfile);

export default router;
