$(function () {
    initCate()

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
                initConten()
            }
        })
    }
    // 初始化富文本编辑器-------------------------------------
    initEditor()
    // 初始化图片裁剪器---------------------------------------
    var $image = $('#image')
    // 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    //初始化裁剪区域
    $image.cropper(options)
    //点击选择封面,触发文件选择框的点击事件--------------------
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    //文件选择框的change事件-----------------------------------
    $('#coverFile').on('change', function () {
        //files是原生bom方法不用$(this)
        var filelist = this.files
        if (filelist.length == 0) {
            return layui.layer.msg('请选择封面', {
                icon: 5
            })
        }
        var file = filelist[0]
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //点击按钮改变文章发布状态---------------------------------
    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    //表单提交事件---------------------------------------------
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', art_state)
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                // fd.forEach(function (value, key) {
                //     console.log(key, value);
                // })
                fd.forEach(function (item, index) {
                    console.log(item);
                })
                publishArtical(fd)

            })
    })

    function publishArtical(fd) {
        $.ajax({
            type: "post",
            url: "/my/article/edit",
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    // location.href = '/article/art_list.html'
                    window.parent.document.querySelector('#artical_list').click()
                })
            }
        })
    }
    var str = location.search.slice(1).split('=')[1]

    function initConten() {
        $.ajax({
            type: "get",
            url: "/my/article/" + str,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })

                }
                // console.log(res);
                layui.form.val('editInfo', res.data)
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', 'http://api-breakingnews-web.itheima.net' + res.data.cover_img) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }

        })
    }

})