var express = require('express');
var router = express.Router();

const userController = require('../controllers/users')

router.post('/signUp',userController.signUp)
router.post('/signIn',userController.signIn)
router.get('/isSign',userController.isSign)
router.get('/signOut',userController.signOut)
// const router = {}

module.exports = router;
