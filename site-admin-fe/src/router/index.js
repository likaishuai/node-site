import SmRouter from 'sme-router'
import activeMiddleWare from './active'
import * as  indexController from '../controllers/index'
import * as  positionController from '../controllers/position'
const router = new SmRouter('main-view')

router.route('/',indexController.render)
router.route('/position',positionController.render)

router.route('*',(req,res,next)=>{
    res.redirect('/') //默认跳转的路由
})

router.use(activeMiddleWare)
