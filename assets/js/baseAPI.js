$(function () {
    //ajax预处理函数
    $.ajaxPrefilter(function (options) {
        //获取url地址,拼接然后传给ajax请求作为url
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //判断是否为加密接口,如果是加密接口,添加请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
    })
})