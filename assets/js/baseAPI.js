// 注意：名称调用$.get()或$.post()或$.ajax()的时候，会先调用这个ajaxPrefilter函数
// 在这个函数中，我们可以拿到我们鬼Ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    // 拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
})