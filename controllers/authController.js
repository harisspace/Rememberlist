// import module
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// create token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge
  })
}

// secure cookie for https
let secure = false
if (process.env.STATUS === 'production') {
  // eslint-disable-next-line no-unused-vars
  secure = true
}

// handleError
const handleError = (err) => {
  const errors = { email: '', password: '', fullName: '' }

  // if login incorrect
  if (err.message === 'incorrect email') {
    errors.email = 'incorrect email'
  }

  if (err.message === 'incorrect password') {
    errors.password = 'incorrect password'
  }

  // handle email already registered
  if (err.code === 11000) {
    errors.email = 'that email is already registered'
    return errors
  }

  // errors login
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

// controllers

// home_get
module.exports.home_get = (req, res) => {
  res.render('index')
}

// signin_get
module.exports.signin_get = (req, res) => {
  res.render('auth/signin')
}

// signin_post
module.exports.signin_post = async (req, res) => {
  const { emailVal, passVal } = req.body

  try {
    const user = await User.signin(emailVal, passVal)

    // create jwt
    res.cookie('jwt', createToken(user._id), { maxAge: maxAge * 1000, httpOnly: true, secure })

    // send user fullname
    res.status(200).json({ user: user.fullName })
  } catch (err) {
    const errors = handleError(err)
    res.json({ errors })
  }
}

// signup_get
module.exports.signup_get = (req, res) => {
  res.render('auth/signup')
}

// signup_post
module.exports.signup_post = async (req, res) => {
  const { emailVal, nameVal, passVal } = req.body

  try {
    const user = await User.create({ email: emailVal, fullName: nameVal, password: passVal })

    if (user) {
      res.status(201).json({ user: user.fullName })
    }
  } catch (err) {
    const errors = handleError(err)
    res.status(400).json({ errors })
  }
}

// logout_get
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/signin')
}
