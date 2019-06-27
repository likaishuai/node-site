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
    //查找单条数据
    async getOne(req, res, next){
        res.set('Content-Type','application/json;charset=utf8')
        let result = await productModel.getOne(req.query.id)
        if(result){
            res.render('succ',{
                data: JSON.stringify(result)
            })
        } else{
            res.render('fail',{
                data: JSON.stringify({
                    message:"查询错误"
                })
            })
        }
    }
    //查找部分数据（分页）
    async getSome(req, res, next){
        res.set('Content-Type','application/json;charset=utf8')
        // console.log(req.query)
        let total = await productModel.getCount()
        let { page=0, pageSize=3 } = req.query
        let result = await productModel.getSome(page, pageSize)
        console.log(result,total)

        if(result){
            res.render('succ',{
                data: JSON.stringify({
                        page: Number(page),
                        pagesize: Number( pageSize),
                        total,
                        result
                    }) 
            })
        } else{
            res.render('fail',{
                data: JSON.stringify({
                    message:"查询错误"
                })
            })
        }
    }
    //删除某一条商品信息
    async delete(req, res, next){
        res.set("Content-type","application/json;charset=utf8")
        // console.log(url.parse(req.url,true).query.id)
        let id = url.parse(req.url,true).query._id
        console.log(id)
        let result = await productModel.delete(id)
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                   message: '该数据已删除！'
                })
            })
        }
    }

    //改，修改某一条数据
    async updata(req, res, next){
        res.set("Content-Type","application/json;charset=utf-8")
        delete req.body.productImg
        req.body = req.filename ?  {...req.body, productImg: req.filename } : req.body
        let result = await productModel.updata(req.body.id, req.body)
        // console.log(result)
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                    message:"编辑数据成功！"
                })
            })
        } else {
            res.render('fail',{
                data:JSON.stringify({
                    massage:"编辑数据失败！！"
                })
            })
        }
    }
 }

 const productController = new ProductController()
 module.exports = productController