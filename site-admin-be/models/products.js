const db = require('../utils/db')

class Product{
    constructor(){
        let ProductSchema = {
            productImg: String,
            productName: String,
            productType: String,
            productPrice: String,
            productNumber: String,
            createData: String
        }
        this.productModel = db.model("products",ProductSchema)
    }

    //插，创建数据插入数据库
    save(data){
        let nowTime = new Date()
        let product = new this.productModel({
            ...data,
            creatData:  nowTime.getFullYear +'年'+nowTime.getMonth+'月'+nowTime.getDay+'日'
        })
         return product.save( data)
    }
    //查，查询全部信息
    findAll() {
        return this.productModel.find({}).sort({_id: -1})
    }
    //查，查找某一条数据
    getOne(id){
        return this.productModel.find({_id:id})
    }
    //删，删除某一条信息
    delete(_id){
        return this.productModel.deleteOne(this.productModel.find({_id}))
    }
    //改，修改某一条数据
    updata(id,data){
        return this.productModel.findByIdAndUpdate(id, data)
    }
}

const product = new Product()
module.exports = product

