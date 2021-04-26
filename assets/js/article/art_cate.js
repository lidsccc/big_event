$(function () {
    // console.log(1);
    //获取列表并渲染
    function initCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                var htmlStr = template('cate_tpl', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }
    initCateList()
    //点击添加按钮,弹出模态框
    var addIndex = null
    $('#btnAddCate').on('click', function () {
        addIndex = layui.layer.open({
            // 类型
            type: 1,
            //大小
            area: ['500px', '249px'],
            title: '添加类别',
            content: $('#dialog-add').html()
        })
    })
    //模态框提交事件
    //模态框是动态添加的,添加事件需要事件委托
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        //获取表单信息
        var data = $('#form-add').serialize()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    initCateList()
                    // $('#form-add')[0].reset()
                    //关闭模态框
                    layui.layer.close(addIndex)
                })
            }
        })
    })
    //点击编辑按钮,编辑按钮是动态渲染的,需要事件委托
    var editIndex = null
    $('tbody').on('click', '.btn-edit', function () {
        editIndex = layui.layer.open({
            // 类型
            type: 1,
            //大小
            area: ['500px', '249px'],
            title: '编辑类别',
            content: $('#dialog-edit').html()
        })
        //获得这个数据里面的id
        var id = $(this).data('id')
        // console.log(id);
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                //快速填充表单
                layui.form.val('form-edit', res.data)
            }
        })
    })
    //开始编辑功能
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: data,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    //重新渲染
                    initCateList()
                    //关闭弹出层
                    layui.layer.close(editIndex)
                })
            }
        })

    })
    //点击删除按钮事件,删除按钮是动态渲染的,需要事件委托
    $('body').on('click', '.btn-delete', function (e) {
        e.preventDefault()
        var id = $(this).data('id')
        //删除操作是敏感操作,需要再次询问
        layui.layer.confirm('确定要删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    console.log(res)
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, {
                            icon: 5
                        })
                    }
                    layui.layer.msg(res.message, {
                        icon: 6
                    })
                    //重新渲染
                    initCateList()
                    //关闭弹出层
                    layui.layer.close(index)
                }
            })
        })
    })
})