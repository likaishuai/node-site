import productTpl from '../views/productList.hbs'
import productAddTpl  from '../views/product-add.hbs'
import oAuth from '../utils/oAuth'
//商品页渲染
export const render = async (req,res,next)=>{
    let result = await oAuth()
    if(result.data.isSign){
        $.ajax({
            url: 'api/products',
            headers:{
                "X-Access-Token": localStorage.getItem('token')
            },
            success(result){
                // console.log( result)
                res.render(productTpl({ 
                    data: result.data.result,
                    hasData: result.data.result.length > 0 
                 }))    
                 bindAddEvent(res)           
             }
        })
    } else {
        res.go('/')
    } 
}
//添加商品界面渲染
export const addProduct= ( req, res, next)=>{
    res.render(productAddTpl({}))    
    bindSubmitEvent(req, res)
}

//添加商品事件
function bindAddEvent(res){
    $('#btn-add-product').on('click',function(e){
        res.go('/product_add')
    })
}

//提交新添商品事件
function bindSubmitEvent(req, res){
    $('#product-submit').on('click',function(e){
        console.log($('#product-submit-from').serialize())
        $("#product-submit-from").ajaxSubmit({
            resetForm: true,
            url: '/api/products',
            headers: {
                'X-Access-Token': localStorage.getItem("token")
            },
            type: 'POST',
            success(result){
                alert(result.data.message)
            }
            
        })
    })

    $('#product-submit-close').on("click",function(e){
        res.back()
    })
}