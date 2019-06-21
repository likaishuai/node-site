var express = require('express');
var router = express.Router();

const userController = require('../controllers/users')
const userOAuth = require("../middlewares/oAuth")

router.post('/signup',userController.signup)
router.post('/signin',userController.signIn)
router.get('/issign',userOAuth)


module.exports = router;
