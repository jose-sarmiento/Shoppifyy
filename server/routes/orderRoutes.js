import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered
} from '../controllers/orderController.js'
import { auth, admin } from '../middleware/auth.js'

const router = express.Router()

router
  .route('/')
  .get(auth, admin, getOrders)
  .post(auth, addOrderItems)
router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getOrderById)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered)

export default router
