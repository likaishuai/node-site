const userModel = require("../models/users")
const bcrypt = require("bcrypt")
const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")


class UserController {
    //对密码加密
    hashPassword( pwd ) {
        return new Promise( (resolve)=>{
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
    //生成token
    genToken(username) {
        let cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private_key.pem'))
        // let cert = 'i love u'
        return jwt.sign({username}, cert, { algorithm: 'RS256'})
      }
    
    //注册
    async signup( req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
       
        let user = await userModel.select( req.body) 
        // console.log( req.body,user)
        if(user){
            res.render( "fail", {
                data: JSON.stringify({
                    message: "用户名已存在，请更换用户名。"
                })
            })
            return 
        } 

        let password = await userController.hashPassword(req.body.password)
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
    async signIn( req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')

        let user = await userModel.select( req.body)
        // console.log(user['username'])
        if(!user){
            res.render("fail",{
                data: JSON.stringify({
                    message: "该用户不存在！！"
                })
            })
        } else{
            let result = await userController.comparePassword(req.body.password,user["password"])
           if( result){
            //    console.log(result)
                res.header('X-Access-Token', userController.genToken(user["username"]))
                res.render("succ",{
                    data: JSON.stringify({
                        username: user['username'],
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

   
}

const userController = new UserController()

module.exports = userController