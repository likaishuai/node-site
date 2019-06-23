const url = require('url')
const productModel = require('../models/products')

 class ProductController {
    constructor(){}
    //添加数据
    async save(req, res, next){

        res.set("Content-Type","application/json;charset=utf-8")
        delete req.body.productImg
        let result = await productModel.save({
            ...req.body,
            productImg: req.filename
        })

        if(result) {
            res.render("succ",{
                data:JSON.stringify({
                    message: "数据保存成功！"
                })
            })
        } else {
            res.render("fail",{
                data:JSON.stringify({
                    message: "数据保存失败！"
                })
            })
        }
    }
    //查找全部数据
    async findAll(req, res, next){
        res.set('Content-Type','application/json;charset=utf-8')
        let result = await productModel.findAll()
        if( result){
            res.render('succ',{
                data: JSON.stringify({
                    result
                })
            })
        }

    }

    //删除某一条商品信息
    async delete(req, res, next){
        res.set("Content-type","application/json;charset=utf8")
        // console.log(url.parse(req.url,true).query.id)
        let id = url.parse(req.url,true).query.id
        let result = await productModel.delete(id)
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                   message: '该数据已删除！'
                })
            })
        }
    }
 }

 const productController = new ProductController()
 module.exports = productController