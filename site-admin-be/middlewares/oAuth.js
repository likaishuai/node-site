const jwt = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')

const oAuth = ( req, res, next)=>{
    res.set('Content-Type','application/json;charset=utf8')
    let token = req.header('X-Access-Token')

    let cert = fs.readFileSync( path.resolve(__dirname,'../keys/rsa_public_key.pem'),"utf-8")
    jwt.verify( token, cert, (err,decoded)=>{
        if(err){
             return  res.render('fail',{
                data:JSON.stringify({
                    isSign: false
                })
            })
         
        } else {           
            res.render('succ',{
                data:JSON.stringify({
                    username:decoded.username,
                    isSign: true
                })
            })
            // next()
        }
        res.end()
    })

}

module.exports = oAuth