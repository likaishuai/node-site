import menuTpl from '../views/menu.html'
import homeTpl from '../views/index-home.hbs'
import users from '../controllers/users'


export const render = (req,res,next)=>{
    $('.sidebar-menu').html(menuTpl)
    users._init()
    users._user()
    res.render(homeTpl({}))
}
