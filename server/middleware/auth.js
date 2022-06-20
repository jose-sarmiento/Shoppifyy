import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const auth = asyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization
  let token

  if (bearerToken && bearerToken.startsWith('Bearer')) {
    token = bearerToken.split(' ')[1]

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decode.id).select('-password')
    } catch (err) {
      res.status(401)
      throw new Error('Invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized no token provided')
  }

  next()
})

const admin = (req, res, next) => {
  if(!req.user && req.user.isAdmin) {
    res.status(401)
    throw new Error('Not authorized, not an admin')
  } 
  next()
}

export { auth, admin }
