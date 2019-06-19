const jwt = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')

const oAuth = ( req, res, next)=>{
    let token = req.header('X-Access-Token')
    let cert = fs.readFileSync(path.resolve(__direname,'../keys/private.key'))
    
    jwt.verify( token, cert, (err,decoded)=>{
        if(!err){
            res.render('succ',{
                data:JSON.stringify({
                    message:"成功"
                })
            })
        }
    })


}

module.exports = oAuth