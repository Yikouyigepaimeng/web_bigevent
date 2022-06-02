// 注意：名称调用$.get()或$.post()或$.ajax()的时候，会先调用这个ajaxPrefilter函数
// 在这个函数中，我们可以拿到我们鬼Ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    // 拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
    // indexOf查询，查询不到就等于-1
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log('执行了complete这个函数');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            layer.msg('对不起！您还没有登录，无法访问后台首页')
                //强制清空token
            localStorage.removeItem('token')
                // 强制挑战首页location.href跳转
            location.href = '/8.0用户验证案例/笔记/大事件项目/login.html'
        }
    }
})