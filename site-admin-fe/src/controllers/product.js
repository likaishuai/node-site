import productTpl from '../views/productList.hbs'
import productAddTpl  from '../views/product-add.hbs'
import productEditTpl from '../views/product-edit.hbs'
import oAuth from '../utils/oAuth'
import random from 'string-random'
// import { readSync } from 'fs';
//商品页渲染
export const render = async (req,res,next)=>{
    let result = await oAuth()
    //健全登录检测
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
                 bindListEvent(res)           
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
//编辑商品界面渲染
export const updataProduct = (req, res, next) =>{
    $.ajax({
        url:'api/products/getOne',
        data: req.query,
        headers: {
            'X-Access-Token':localStorage.getItem('token')
        },
        success(result){
            res.render(productEditTpl(result.data[0] ))
            bindEditEvent(req, res)
        },
        error(err){
            alert(err.message)
        }
    })
}
//list页面商品事件
function bindListEvent(res){
    //添加商品事件
    $('#btn-add-product').on('click',function(e){
        res.go('/product_add')
    })
    //删除某一条数据
    $('#product-list-main').on('click',".product-delete",function(e){
        // console.log($(e.target).closest('tr').attr('_dataId'))
        let _id = $(e.target).closest('tr').attr('_dataId')
        let _url = 'api/products?_id=' + _id
        $.ajax({
            url: _url,
            type: "DELETE",
            headers:{
                "X-Access-Token": localStorage.getItem("token")
            },
            success:(result)=>{
                alert(result.data.message)
                res.go('/product/'+ random())
            }
        })

    })

    //编辑某条数据
    $('#product-list-main').on('click',".product-edit",function(e){
        let id = $(e.target).closest('tr').attr("_dataId")
        res.go('/product_edit?id='+ id)
    })
}

//提交新添商品事件
function bindSubmitEvent(req, res){
    $('#product-submit').off("click").on('click',function(e){
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

//编辑商品事件
function bindEditEvent(req, res){
   //返回
    $('#main-view').off('click', '#product-edit-close').on('click', '#product-edit-close', function(e){
        res.go('/product/'+random())
    })
    //提交
    $('#main-view').off('click', '#product-edit').on('click', '#product-edit', function(e){
        $("#product-edit-from").ajaxSubmit({
            url:'api/products/updata',
            type: 'post',
            data: req.query,
            headers:{
                "X-Access-Token": localStorage.getItem('token')
            },
            success(result){
                alert(JSON.stringify(result.data.message))
                res.go('/product/'+random())
            },
            error(err){
                alert(err.message+ "error")
            }
        })
    })
}