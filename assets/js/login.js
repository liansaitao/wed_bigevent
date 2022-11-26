$(function(){
    // alert(11)
    //点击注册按钮的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录按钮的链接
    $('#link_login').on('click', function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })


    // 用layui获取form表单
    let form = layui.form
    let layer = layui.layer
    
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 验证两次密码是否一直
        repwd:function(value){
            // 通过形参拿到的是确认密码中的值
            // 还需拿到密码框中的内容
            // 然后进行一次判断
            // 如果判断失败 则return一个提示
            let pwd = $('.reg-box [name="password"]').val()
            if(pwd !== value){
                return '两次密码不一致！'
            }
        },

    })

    // 监听注册表单的请求
    $('#form_reg').on('submit', function(e){
        e.preventDefault()
        // 发起ajax请求
        $.post('/api/reguser',
            { username: $('.reg-box [name = "username"]').val(), 
                password: $('.reg-box [name="password"]').val()},
                function(e){
                    if (e.status !==0){
                    
                        return layer.msg(e.message);
                    }
                    layer.msg('注册成功，请登录')
                    $('#link_login').click()
                })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            url: '/api/login',
            method :  'POST',
            // 快速获取表单里的内容
            data: $(this).serialize(),
            success :function(res){
                if (res.status !==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登录成功的 token 字符串 保存到本地存储
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                location.href = '/index.html'
            }
        })
    })
})