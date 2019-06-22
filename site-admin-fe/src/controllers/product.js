import productTpl from '../views/productList.hbs'

export const render = (req,res,next)=>{
    res.render(productTpl({}))
}