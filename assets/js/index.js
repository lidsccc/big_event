$(function () {
    //封装获取用户信息函数
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            //加密请求需要加请求头
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: function (res) {
                // console.log(res);
                //判断是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                //开始渲染用户信息
                showUserInfo(res.data)
            }
        })
    }
    getUserInfo()
    //渲染用户昵称和头像
    function showUserInfo(user) {
        //优先取用户的昵称
        var name = user.nickname || user.username
        $('#welcome').html('欢迎 ' + name)
        //判断用户是否有头像
        if (user.user_pic !== null) {
            //如果有就用获取到的信息的图片地址
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            //如果没有就用用户首字母大写
            var first = name[0]
            $('.text-avatar').html(first.toUpperCase()).show()
            $('.layui-nav-img').hide()
        }
    }
})