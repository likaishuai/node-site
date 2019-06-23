export default function() {
    //认证信息
    return $.ajax({
        url: '/api/users/issign',
        headers: {
            'X-Access-Token': localStorage.getItem('token') || ''
        },
        dataType:'json',
        
        success:( result)=>{
            return result
        },
        error: (err)=>{
            return false 
        }

    })
}