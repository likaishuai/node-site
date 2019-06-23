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

 }

 const productController = new ProductController()
 module.exports = productController