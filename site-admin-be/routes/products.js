const express = require('express')
const router = express.Router()

const productController = require('../controllers/products')
const fileUpload = require('../middlewares/upload-file')
const isSign = require('../middlewares/isSignMiddleware')
router.route('/')
    .all(isSign)
    .get(productController.getSome)
    .post(fileUpload.uploadFile, productController.save)
    .delete(productController.delete)

router.post('/updata', isSign,fileUpload.uploadFile, productController.updata)
router.get('/getone', isSign, productController.getOne)
module.exports = router
