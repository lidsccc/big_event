$(function () {
    //alert(1)
    //获取裁剪区域的 DOM 元素
    var $image = $('#image')
    //配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    //创建裁剪区域
    $image.cropper(options)
    //上传input表单隐藏,点击上传按钮触发点击上传input表单
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //上传input表单发生change事件
    $('#file').on('change', function (e) {
        // console.log(e.target.files);
        var filelist = e.target.files
        if (filelist.length == 0) {
            return layui.layer.msg('请选择图片', {
                icon: 5
            })
        }
        var file = filelist[0]
        var newImgURL = URL.createObjectURL(file)
        $image.cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //点击上传按钮
    $('#btnUpload').on('click', function () {
        var filelist = $('#file')[0].files
        if (filelist.length == 0) {
            return layui.layer.msg('请选择头像', {
                icon: 5
            })
        }
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
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
                    window.parent.getUserInfo()
                })
            }
        })
    })
})