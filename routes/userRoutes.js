import express from 'express'
import {
   userProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
   getUserById,
   updateUser,
} from '../controllers/userController.js'
import { auth, admin } from '../middleware/auth.js'

const router = express.Router()

router
   .route('/')
   .get(auth, admin, getUsers)
router.route('/profile').put(auth, updateUserProfile)
router
   .route('/:id')
   .delete(auth, admin, deleteUser)
   .get(auth, admin, getUserById)
   .put(auth, admin, updateUser)
router.route('/profile').get(auth, userProfile)

export default router
