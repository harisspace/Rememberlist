const { Router } = require('express')
const mylistController = require('../controllers/mylistController')

const router = Router()

router.get('/', mylistController.mylist_get)
router.post('/', mylistController.mylist_post)
router.delete('/delete/:id', mylistController.mylist_delete_id)
router.post('/update/:id', mylistController.mylist_id_post)
router.post('/isDone/:id', mylistController.mylist_isDone_id_post)
// router.get('/note/:id', mylistController.mylist_note_get)

module.exports = router
