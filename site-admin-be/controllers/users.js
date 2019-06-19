const userModel = require("../models/users")
const bcrypt = require("bcrypt")

class UserController {
    //对密码加密
    hashPassword( pwd ) {
        return new promise( (resolve)=>{
            bcrypt.hash( pwd,10,(err,hash)=>{
                resolve(hash)
            } )
        } )
    }
    //加密密码比对
    comparePassword( pwd,hash ){
        return new Promise( (resolve)=>{
            bcrypt.compare( pwd, hash, function( err, res){
                resolve(res)
            } )
        })
    }
    //注册
    async signUp( req, res, next) {
        let user = await userModel.select(req.body)
        if(user){
            res.render( "succ", {
                data: JSON.stringify({
                    message: "用户名已存在，请更换用户名。"
                })
            })
            return 
        } 
        res.set('Content-Type','application/json; charset=utf-8')

        let password = await userController.hashPassword(res.body.password)
        let result = await userModel.insert({
            ...req.body,password
        })

        if(result){
            res.render("succ",{
                data:JSON.stringify({
                    message: "恭喜！已完成注册！"
                })
            })
        } else{
            res.render("fail",{
                data:JSON.stringify({
                    message: "注册失败！"
                })
            })
        }        
    }
    //登录
    async signIn( req, rse, next) {
        let user = await userModel.select( req.body)

        if(!user){
            res.render("fail",{
                data: JSON.stringify({
                    message: "该用户不存在！！"
                })
            })
        } else{
            let result = await userController.comparePassword(req.body.password,user["password"])
           if( result){
               req.session.username = user['username']
                res.render("succ",{
                    data: JSON.stringify({
                        message: "登录成功！！"
                    })
                })
           } else{
               res.render("fail",{
                   data:JSON.stringify({
                       message: "密码错误！"
                   })
               })
           } 
        } 
    }
    // session用户对否存在
    isSign( req, res, next ){
        res.set('Content-Type','application/json;charset=utf-8')
        if(req.session.username) {
            res.render('succ',{
                data: JSON.stringify({
                    username: req.session.username,
                    isSign: true
                })
            })
        } else{
            res.render('fail',{
                data: JSON.stringify({
                    isSign: false
                })
            })
        }
    }
    //注销用户
    signOut( req, res, next) {
        req.session.username = null
        res.render("succ",{
            data:JSON.stringify({
                isSign: false
            })
        })
    }
}

const userController = new UserController()

module.exports = userController