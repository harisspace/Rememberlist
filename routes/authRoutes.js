const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.get('/', authController.home_get)

router.get('/signin', authController.signin_get)

router.get('/signup', authController.signup_get)

router.post('/signup', authController.signup_post)

module.exports = router
