const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Please enter a valid email'],
    lowercase: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimum password length 6 characters']
  },
  category: {
    type: [],
    default: ['kuliah', 'keluarga','Agama']
  }
}, { timestamps: true })

// pre save
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// statics method => method that i can build
userSchema.statics.signin = async function (email, password) {
  const user = await User.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema)

module.exports = User
