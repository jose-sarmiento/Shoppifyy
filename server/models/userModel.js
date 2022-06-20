import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      firstname: {type: String, required: true},
      lastname: {type: String, required: true}
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: String,
    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: String,
    address: {
      region: String,
      province: String,
      city: String,
      barangay: String,
      street: String,
      houseNumber: String,
      zipcode: String
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
