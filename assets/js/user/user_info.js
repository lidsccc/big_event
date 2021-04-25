$(function () {
    // console.log(1);
    //获取用户信息,展示到表单中
    function showUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                // $('.layui-form [name=username]').val(res.data.username)
                // $('.layui-form [name=nickname]').val(res.data.nickname)
                // $('.layui-form [name=email]').val(res.data.email)
                // $('.layui-form [name=id]').val(res.data.id)
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    showUserInfo()
    //重置按钮
    $('.layui-form').on('reset', function (e) {
        //阻止默认清空行为
        e.preventDefault()
        //重新展示用户信息
        showUserInfo()
    })
    //表单验证
    layui.form.verify({
        nickname: function (value, item) {
            if (value.length > 6) {
                return '昵称不能超过6个字符'
            }
        }
    })
    //提交按钮
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        //layui收集表单方法
        // var data = layui.form.val("formUserInfo")
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                layui.layer.msg(res.message, {
                    icon: 6
                })
                //把主页的获取和展示用户信息的函数变成全局函数,
                //子页面然后调用父页面的函数,这里的window表示子页面的最高级
                window.parent.getUserInfo()
            }
        })
    })
})