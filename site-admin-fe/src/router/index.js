import SmRouter from 'sme-router'
import activeMiddleWare from './active'
import * as  indexController from '../controllers/index'
import * as  productController from '../controllers/product'
const router = new SmRouter('main-view')

router.route('/',indexController.render)
router.route('/product/:id',productController.render)
router.route('/product_add',productController.addProduct)
router.route('/product_edit',productController.updataProduct)

router.route('*',(req,res,next)=>{
    res.redirect('/') //默认跳转的路由
})

router.use(activeMiddleWare)
