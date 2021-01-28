const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Please enter a valid email'],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimum password length 6 characters']
  },
  fullName: {
    type: String,
    required: true,
    lowercase: true
  }
}, { timestamps: true })

const User = mongoose.model('user', userSchema)

module.exports = User
