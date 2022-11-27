$(function(){
    getUserInfo()

    let layer = layui.layer
    // 退出按钮的渲染
    $('#btnLogout').on('click',function(){
        // console.log(11);
        layer.confirm('您确定要退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 删除本地存储
            localStorage.removeItem('token')
            // 跳转到登录的页面
            location.href = '/login.html'
            layer.close(index);
        });
        
    })
    
})

// 获取用户的信息
function getUserInfo(){
    $.ajax({
        method : 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success : function(e){
            console.log(e);
            if(e.status !==0){
                return layui.layer.msg('获取用户失败！')
            }

            // 调用头像渲染的函数
            renderAvatar(e.data)

        },
        // complete : function(res){
        //     if(res.responseJSON.status === 1 && res.responseJSON.
        //         message === '身份认证失败！'){
        //             // 强制清空 token
        //             localStorage.removeItem('token')
        //             location.href = '/login.html'
        //         }
        // }
    })
}


// 渲染头像函数
function renderAvatar(user){
    // 获取数据里面的名字
    let uname = user.nickname || user.username
    // 渲染到页面里面名字
    $('#welcome').html('欢迎&nbsp;&nbsp' + uname)
    // 判断是否有上传的头像
    if(user.user_pic !== null){
    
    // 显示上传的头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    // 隐藏字体头像
    $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        let uname1 = uname[0].toUpperCase()
        $('.text-avatar').html(uname1).show()
        
    }

}
