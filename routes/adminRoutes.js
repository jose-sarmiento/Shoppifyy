import express from 'express'
import {
   updateUserAdmin,
} from '../controllers/userController.js'
import { auth, admin } from '../middleware/auth.js'

const router = express.Router()

router
   .route('/users')
   .put(updateUserAdmin).get(auth, admin, updateUserAdmin)

export default router
