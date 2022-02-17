import express from 'express'
import {
  getProducts,
  getAdminProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js'
import { admin, auth } from '../middleware/auth.js'
import paginate from "../middleware/paginate.js"
import Product from "../models/productModel.js"

const router = express.Router()

router
  .route('/')
  .get(paginate(Product),getProducts)
  .post(auth, admin, createProduct)
router
  .route('/admin')
  .get(getAdminProducts)
router
  .route('/top')
  .get(getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct)
router
  .route('/:id/reviews')
  .post(auth, createProductReview)

export default router
