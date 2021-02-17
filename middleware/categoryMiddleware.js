const User = require('../models/User')
const jwt = require('jsonwebtoken')

const checkCategory = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.locals.category = null
        next()
      } else {
        const user = await User.findById(decodedToken.id)
        res.locals.category = user.category
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { checkCategory }
