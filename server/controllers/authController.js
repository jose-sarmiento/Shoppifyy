import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

/**
 * @desc    Auth user and return token
 * @route   POST api/auth/login
 * @access  public
 */
const login = asyncHandler(async (req, res) => {
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
 * @desc    Register user
 * @route   post api/auth/register
 * @access  public
 */
const register = asyncHandler(async (req, res) => {
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
 * @desc    Loggeed in user using gmail account
 * @route   post api/auth/google-signin
 * @access  public
 */
const loginWithGoogle = asyncHandler(async (req, res) => {
   const { googleId, userInfo } = req.body

   let user = await User.findOne({ email: userInfo.email })

   if(!user) {
      user = new User(userInfo)
      user = await user.save()
   }

   res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
   })
})


export {
   login,
   register,
   loginWithGoogle
}
