export default (req)=>{
    let url = req.url.split('/')[1]
    // console.log(url)
    $(`.sidebar-menu a[href="#/${url}/0/"]`).parent().addClass("active").siblings().removeClass("active")
} 