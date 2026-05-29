import express from 'express';
import {
  getBanners,
  getActiveBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/bannerController.js';

const router = express.Router();

router.route('/active').get(getActiveBanners);
router.route('/').get(getBanners).post(createBanner);
router.route('/:id').put(updateBanner).delete(deleteBanner);

export default router;
