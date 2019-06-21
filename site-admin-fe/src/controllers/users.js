import userTpl from '../views/user.html'
import userPanelTel from '../views/user-panel.html'
import oAuth from '../utils/oAuth'


class Users {
        
    async _init(){
        let result = await oAuth()    
        // console.log(result)  
        if(result){
            // result = result.responseJSON
            users._renderUserTpl({...result.data})
        } else {
            users._renderUserTpl({})
        }
    }

    _renderUserTpl({ isSign, username}){
        //导航栏用户信息
        let template = Handlebars.compile(userTpl)
        let renderedUserTpl = template({
            isSign,
            username
        })
        $('#userSignPlace').html(renderedUserTpl)
        //侧边栏用户信息
        let templatePanel = Handlebars.compile(userPanelTel)
        let renderPanelTel = templatePanel({
            isSign,
            username
        })
        $('#user-panel').html(renderPanelTel)
        users._user()
    }

    //渲染user模板，绑定注册事件
    _user(){
        //登录注册按钮
        $('#user').on('click','span',function(e){
            if($(this).attr('id') ==='user-signIn' ){
                $('.box-title').html("登录")
                users._signin()
            } else{
                $('.box-title').html("注册")
                users._signup()
            }
        })
        //注销按钮
        $('.user-menu').on('click','#signOut',()=>{
            localStorage.removeItem('token')
            location.reload()
        })
    }
    
    // 用户注册
    _signup() {
        $('#confirm').on('click', () => {
        $.ajax({
            url: '/api/users/signup',
            type: 'POST',
            data: $('#user-form').serialize(),
            success:(data)=>{          
                alert(data.data.message)           
            }
        })
        })
    }
    // 用户登录
    _signin() {
        $('#confirm').on('click', () => {
        $.ajax({
            url: '/api/users/signin',
            type: 'POST',
            data: $('#user-form').serialize(),
            success:(data, statusCode, jqXHR)=>{            
                users._signinStatus(data, jqXHR)
                alert(data.data.message)      
            }
        })
        })
    }
    //登录后状态保存
    _signinStatus(result, jqXHR){
        if ( result.ret){
            users._renderUserTpl({
                isSign : true,
                username: result.data.username
            })
            localStorage.setItem('token',jqXHR.getResponseHeader('X-Access-Token'))
        }
    }

}

const users = new Users()

export default new Users()