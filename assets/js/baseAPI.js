$(function () {
    //ajax预处理函数
    $.ajaxPrefilter(function (options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    })
})