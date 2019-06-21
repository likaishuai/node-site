const db = require('../utils/db')
class  UserModel  {
    constructor() {
       this.userModel = db.model('users',{
            username: String,
            password: String
        })
    }
    //插入数据库数据
    insert( data ){      
        //实例化model
        const users = new this.userModel(data)
        return users.save() //操作数据库中的save方法，插入数据，返回 promise，使用时要用async await
    }
    //查找一条数据 返回姓名
    select( data ){
        return this.userModel.findOne({ username: data.username })
    }
    
}


module.exports  = new UserModel()