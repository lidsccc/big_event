//入口函数
$(function () {
    //单击去注册
    // $('#link_reg').on('click', function () {
    //     //注册表单显示
    //     $('.reg-box').show()
    //     //登陆表单隐藏
    //     $('.login-box').hide()
    // })
    // //单击去登陆
    // $('#link_login').on('click', function () {
    //     //注册表单隐藏
    //     $('.reg-box').hide()
    //     //登陆表单显示
    //     $('.login-box').show()
    // })
    $('#link_reg,#link_login').on('click', function () {
        $('.reg-box,.login-box').toggle()
    })
    //自定义校验
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须为6-12位的非空字符'
        ],
        repwd: function (value, item) {
            if (value !== $('#form_reg [name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })
    //注册事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        //收集表单信息
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim()
        }
        //发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // return alert('注册失败')
                    //layui的弹出层更美观
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                //注册成功自动跳转到登陆页面
                // $('#link_login').click()
                layui.layer.msg('用户注册成功', {
                    icon: 6
                }, function () {
                    //layui弹出层执行后的回调函数
                    $('#link_login').click()
                })
            }
        })
    })
    //登陆事件
    $('#form_login').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        //收集表单信息
        var data = $(this).serialize()
        //发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    // return alert('登陆失败')
                    //layui的弹出层更美观
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                //登陆成功弹出层
                layui.layer.msg(res.message, {
                    icon: 6
                    //layui弹出层执行后的回调函数
                }, function () {
                    //保存token到本地存储
                    localStorage.setItem('token', res.token)
                    //跳转页面到主页
                    location.href = '/index.html'
                })
            }
        })
    })
})