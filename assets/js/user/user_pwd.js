$(function () {
    // alert(2)
    //自定义校验
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须为6-12位的非空字符'
        ],
        //校验新旧密码不能一致
        samepwd: function (value, item) {
            if (value === $('.layui-form [name=oldPwd]').val()) {
                return '新密码不能和旧密码一致'
            }
        },
        //判断确认新密码和新密码是否一致
        repwd: function (value, item) {
            if (value !== $('.layui-form [name=newPwd]').val()) {
                return '两次密码不一致'
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
        // console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    $('.layui-form')[0].reset()
                })
            }
        })
    })
})