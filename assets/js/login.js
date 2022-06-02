$(function() {
    $('.login-box a').click(function() {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('.reg-box a').click(function() {
            $('.reg-box').hide();
            $('.login-box').show()
        })
        // 从layui中获取form对象
    var form = layui.form
        //自定义提示对象
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
            //自定义一个叫做pwd的校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                // 通过型参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败直接return一个提示信息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd != value) {
                    return '两次密码不一致'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').submit(function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status != 0) return layer.msg(res.message)
            layer.msg('注册成功')
                // 模拟人的点击行为
            $('.reg-box a').click()
        })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault()
            // serialize快速获取表单的所有数据
        $.post('/api/login', $(this).serialize(), function(res) {
            if (res.status != 0) return layer.msg(res.message)
            layer.msg('登录成功')
                // localStorage.setItem永久存储
            localStorage.setItem('token', res.token)
                // 跳转页面location.href
            location.href = '/8.0用户验证案例/笔记/大事件项目/index.html'
        })
    })
})