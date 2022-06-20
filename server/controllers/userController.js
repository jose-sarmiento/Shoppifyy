import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

/**
 * @desc    Auth user and return token
 * @route   POST api/users/login
 * @access  public
 */
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const user = await User.findOne({ email })

   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   } else {
      res.status(401)
      throw new Error('Invalid email or password')
   }
})

/**
 * @desc    Get user profile
 * @route   GET api/users/profile
 * @access  private
 */
const userProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         picture: user.picture,
         isAdmin: user.isAdmin,
         address: user.address,
         phone: user.phone,
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

/**
 * @desc    Register user
 * @route   post api/users/register
 * @access  private
 */
const userRegister = asyncHandler(async (req, res) => {
   const { name, email, password, phone } = req.body

   const userExists = await User.findOne({ email })
   if (userExists) {
      res.status(400)
      throw new Error('User already exists')
   }

   const user = await User.create({
      name,
      email,
      password,
      phone,
   })

   if (!user) {
      res.status(500)
      throw new Error('Something went wrong')
   }

   res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
   })
})

/**
 * @desc    Update user profile
 * @route   Put api/users/profile
 * @access  private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
   if(req.body && req.user.isAdmin) {
      if(user.isAdmin) {
         req.body.isAdmin = req.body.isAdmin
      } else {
         return res.status(401).send("unauthorized")
      }
   }
   const user = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true, useFindAndModify: false})
   
   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         picture: user.picture,
         isAdmin: user.isAdmin,
         phone: user.phone,
         address: user.address
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

/**
 * @desc    Update user profile
 * @route   Put api/users/profile
 * @access  private
 */
const updateUserAdmin = asyncHandler(async (req, res) => {
   const user = await User.findOneAndUpdate({_id: req.body.userId}, req.body, {new: true, useFindAndModify: false})
   
   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         picture: user.picture,
         isAdmin: user.isAdmin,
         phone: user.phone,
         address: user.address
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

/**
 * @desc    Get users
 * @route   Get api/users
 * @access  private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find({})
   res.json(users)
})

/**
 * @desc    Delete user
 * @route   Delete api/users/:id
 * @access  private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById({ _id: req.params.id })

   if (user) {
      await user.remove()
      res.json({ msg: 'User deleted successfully' })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

/**
 * @desc    Get user By ID
 * @route   GET api/users/:id
 * @access  private/admin
 */
const getUserById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if (user) {
      res.json(user)
   } else {
      res.status(404)
      throw new Error('User not Found')
   }
})

/**
 * @desc    Update user By ID
 * @route   UPDATE api/users/:id
 * @access  private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin

      const newUser = await user.save()

      res.json({
         _id: newUser._id,
         name: newUser.name,
         email: newUser.email,
         isAdmin: newUser.isAdmin,
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

export {
   authUser,
   userProfile,
   userRegister,
   updateUserProfile,
   updateUserAdmin,
   getUsers,
   deleteUser,
   getUserById,
   updateUser,
}
