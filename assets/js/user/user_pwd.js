$(function() {
    var form = layui.form
    form.verify({
        //自定义一个叫做pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同'
        },
        // 校验确认密码是否一致
        repwd: function(value) {
            // 通过型参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败直接return一个提示信息即可
            var pwd = $('[name=newPwd]').val()
            if (pwd != value) {
                return '两次新密码不一致'
            }
        }
    })
    $('.layui-form').submit(function(e) {
        // preventDefault阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // serialize快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layui.layer.msg('旧密码错误，重置密码失败')
                layui.layer.msg('重置密码成功')
                    // reset重置
                $('.layui-form')[0].reset()
            }
        })
    })
})