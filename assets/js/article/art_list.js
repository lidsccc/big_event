$(function () {
    //定义一个对象,里面内容可变
    var q = {
        pagenum: 1, //显示多少页的值
        pagesize: 2, //一页显示多少条信息
        cate_id: '', // 类名
        state: '' //状态
    }
    //时间美化过滤器
    template.defaults.imports.dataFormate = function (data) {
        var time = new Date(data)
        var y = time.getFullYear()
        var mon = addZero(time.getMonth() + 1)
        var d = addZero(time.getDate())
        var h = addZero(time.getHours())
        var min = addZero(time.getMinutes())
        var s = addZero(time.getSeconds())
        return y + '-' + mon + '-' + d + ' ' + h + ':' + min + ':' + s
    }
    //定义时间补零函数
    function addZero(n) {
        return n >= 10 ? n : '0' + n
    }
    //渲染页面
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                //console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                var htmlStr = template('artical_list-tpl', res)
                $('tbody').html(htmlStr)
                initPage(res.total)
            }
        })
    }
    initTable()
    //获取分类,渲染下拉菜单
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                //模板引擎,开始渲染
                var htmlStr = template('cate_tpl', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }
    initCate()
    //点击搜索重新更改q的属性,重新渲染页面
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initTable()
    })
    //定义渲染分页
    function initPage(total) {
        layui.laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页展示数量
            curr: q.pagenum,
            layout: ['limit', 'prev', 'page', 'next', 'count', 'skip'],
            limits: [2, 4, 6, 8],
            jump: function (obj, first) {
                //console.log(obj); //obj包含了当前分页的所有参数，比如：
                //console.log(first);
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                // q.pagesize = obj.limit

                if (first == true) {
                    return
                }
                q.pagesize = obj.limit
                q.pagenum = obj.curr
                initTable()
            }
        })
    }
    //删除事件,敏感操作,事件委托
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).data('id')
        var num = $('.btn-delete').length
        layer.confirm('确定要删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, {
                            icon: 5
                        })
                    }
                    layui.layer.msg(res.message, {
                        icon: 6
                    }, function () {
                        if (num == 1) {
                            q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                        }
                        initTable()
                        layui.layer.close(index)
                    })
                }
            })
        })
    })
    //编辑事件.事件委托
    $('tbody').on('click', '.btn-change', function () {
        var id = $(this).data('id')
        location.href = '/article/art_pub copy.html?id=' + id
        // $.ajax({
        //     type: "get",
        //     url: "/my/article/" + id,
        //     success: function (res) {
        //         if (res.status !== 0) {
        //             return layui.layer.msg(res.message, {
        //                 icon: 5
        //             })
        //         }
        //     }
        // })
    })
})