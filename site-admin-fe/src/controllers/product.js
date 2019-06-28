import productTpl from '../views/productList.html'
import productAddTpl  from '../views/product-add.hbs'
import productEditTpl from '../views/product-edit.hbs'
import oAuth from '../utils/oAuth'
import random from 'string-random'

// import { readSync } from 'fs';
// //商品页渲染
// export const render = async (req,res,next)=>{
//     let result = await oAuth()
//     //健全登录检测
//     if(result.data.isSign){
//         $.ajax({
//             url: 'api/products',
//             headers:{
//                 "X-Access-Token": localStorage.getItem('token')
//             },
//             success(result){
//                 res.render(productTpl({ 
//                     data: result.data.result,
//                     hasData: result.data.result.length > 0 
//                  }))    
//                  bindListEvent(res)           
//              }
//         })
//     } else {
//         res.go('/')
//     } 
// }
//商品分页渲染
export const render = async (req,res,next)=>{
    let result = await oAuth()
    //健全登录检测
    if(result.data.isSign){
        let page = req.query ? req.query.page: 0
        let pageSize = req.query ? req.query.pageSize : 3
        let keyword = req.query ? req.query.keyword : ''
        $.ajax({
            url: 'api/products',
            headers:{
                "X-Access-Token": localStorage.getItem('token')
            },
            data:{
                page,
                pageSize,
                keyword 
            },
            success(result){
                let pageNumber = []
                for(let i = 1; i <= Math.ceil(result.data.total/~~pageSize) ; i++){
                    pageNumber.push(i)
                }
                let listHtml = template.render(productTpl,{
                    data: result.data.result,
                    hasData: result.data.result.length > 0 ,      
                    url: location.hash.split('?')[0],              
                    page: ~~page,
                    pageSize: ~~pageSize,
                    total: result.data.total,
                    keyword,
                    pageNumber
                })
                res.render(listHtml)    
                bindListEvent(req,res)           
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
function bindListEvent(req,res){
    //添加商品事件
    $('#btn-add-product').on('click',function(e){
        res.go('/product_add')
    })
    //删除某一条数据
    $('#product-list-main').on('click',".product-delete",function(e){
        let conf = confirm("你确定要删除该数据？")
        if(!conf){
            return
        } else{
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
                    let page = req.query? ~~req.query.page : 0
                    let pageSize = req.query? ~~req.query.pageSize : 3
                    let keyword = req.query? req.query.keyword : ''
                    let total = ~~result.data.total
                    
                    // 最后一页内容删除完毕以后，需要跳转到上一页
                    page = (page * pageSize === total - 1) && (page > 0) ? page - 1 : page

                    res.go('/product/'+ random() + `?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
                }
            })
        }
    })

    //编辑某条数据
    $('#product-list-main').on('click',".product-edit",function(e){
        let id = $(e.target).closest('tr').attr("_dataId")
        res.go('/product_edit?id='+ id)
    })

    //搜索操作(接口完成 事件未完  改用路由操作)
    // $('#list-search').on('click',function(e){
    //     let keyword = $(e.target).closest('div').siblings().attr('value')
    //     go()
    // })

    //页码高亮事件
    let url = location.hash.split('?')[0]             
    let page = req.query? ~~req.query.page:0
    let pageSize = req.query? ~~req.query.pageSize : 3
    let keyword = req.query? req.query.keyword : ''
    console.log($(`a[href="${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword}"]`),keyword)
    $(`a[href="${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword?keyword:''}"]`).closest('li').addClass("active").siblings().removeClass("active")
}

//提交新添商品事件
function bindSubmitEvent(req, res){
    $('#product-submit').off("click").on('click',function(e){
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