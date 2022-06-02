$(function() {
        // 调用getUserInfo()获取用户基本信息
        getUserInfo()
        var layer = layui.layer
            // btnLogout点击按钮实现退出功能
        $('#btnLogout').click(function() {
            // 提示用户是否退出
            layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1.清空本地存储的token removeItem移除
                localStorage.removeItem('token')
                    // 2.location.href跳转页面
                location.href = '/8.0用户验证案例/笔记/大事件项目/login.html'
                    // 关闭confirm询问框
                layer.close(index);
            });
        })
    })
    // 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     // localStorage.getItem获取永久存储的数据
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) return layui.layer.msg('获取用户信息失败！')
                // renderAvater渲染头像
            renderAvater(res.data)
        },
        // 不论成功或者鼠标都会调用comlete这个函数
        // complete: function(res) {
        //     // console.log('执行了complete这个函数');
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         layer.msg('对不起！您还没有登录，无法访问后台首页')
        //             //强制清空token
        //         localStorage.removeItem('token')
        //             // 强制挑战首页location.href跳转
        //         location.href = '/8.0用户验证案例/笔记/大事件项目/login.html'
        //     }
        // }
    })
}
// renderAvater渲染头像
function renderAvater(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户的头像
    if (user.user_pic != null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
            // toUpperCase转大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}