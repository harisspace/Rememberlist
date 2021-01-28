module.exports.home_get = (req, res) => {
  res.render('index')
}

module.exports.signin_get = (req, res) => {
  res.render('auth/signin')
}

module.exports.signup_get = (req, res) => {
  res.render('auth/signup')
}

module.exports.signup_post = (req, res) => {
  console.log(req.body)
}
