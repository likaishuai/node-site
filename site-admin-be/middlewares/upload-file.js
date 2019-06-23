const multer = require('multer')
const path = require('path')
const randomString = require('node-random-string')

class FileUpload{
    

    _fileFilter(req, file, cb) {
        let mimeRegExp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)','gi')
        if (mimeRegExp.test(file.mimetype)){
            cb(null,true)
        } else{
            cb(null,false)
            cb(new Error('文档格式不正确!'))
        }
    }

    uploadFile(req, res, next){
        let fileName = ''
        let storage = multer.diskStorage({
            //文件存储位置
            destination: (req, file, cb) =>{
                cb(null, path.resolve(__dirname, '../public/upload'))
            },
            //重定义文件名字
            filename: (req, file, cb) =>{
                let fileOriName = file.originalname
                let lastDotIndex = fileOriName.lastIndexOf('.')
                let extFilename = fileOriName.slice(lastDotIndex)

                let rs = randomString({
                    length: 10,
                    lowerCase: true
                })

               fileName = rs + extFilename
                cb(null,fileName)
            }
        })

        var upload = multer({ 
            storage: storage,
            limits: {
                fileSize: 1024 * 1024
            },
            fileFilter: fileUpload._fileFilter
         }).single('productImg')

         upload(req, res, (err)=>{
             if(err) {
                 res.render('fail',{
                     data: JSON.stringify(err.message)
                 })
             } else {
                req.filename = fileName
                next()
             }
         })
    }
}

let fileUpload = new FileUpload()
module.exports = fileUpload