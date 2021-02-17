const { Router } = require('express')
const authController = require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = Router()

router.get('/', authController.home_get)
router.get('/signin', authController.signin_get)
router.post('/signin', authController.signin_post)
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/logout', requireAuth, authController.logout)

module.exports = router
