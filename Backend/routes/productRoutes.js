import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductApproval
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);
router.route('/:id/approve').put(updateProductApproval);

export default router;
