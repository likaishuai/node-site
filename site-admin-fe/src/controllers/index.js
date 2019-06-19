import menuTpl from '../views/menu.html'
import userTpl from '../views/user.html'
import homeTpl from '../views/index-home.hbs'


{name:false}
function _renderUserTpl({ isSign = false}){
    let template = Handlebars.compile(userTpl)
    let renderedUserTpl = template({
        isSign
    })
    $('#userSignPlace').html(renderedUserTpl)
}

//渲染user模板，绑定注册事件
function _user(res){
    _renderUserTpl({})
    $('#user').on('click','span',function(e){
        if($(this).attr('id') ==='user-signIn' ){
            $('.box-title').html("登录")
        } else{
            $('.box-title').html("注册")
        }
    })
}
 
// 用户注册
function _signup() {
    $('#confirm').on('click', () => {
      console.log($('#user-form').serialize())
      $.ajax({
        url: '/api/users/signup',
        type: 'POST',
        data: $('#user-form').serialize()
      })
    })
  }
   
//   const render = (req,res,next)=>{
//         $('.sidebar-menu').html(menuTpl)
//         _renderUserTpl({ })
//         _user(res);
//         res.render(homeTpl({}))
//     } 


// export default render

export const render = (req,res,next)=>{
    $('.sidebar-menu').html(menuTpl)
    _renderUserTpl({ })
    _user(res);
    res.render(homeTpl({}))
}
