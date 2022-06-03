$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) return '昵称长度必须在1~6个字符之间'
        }
    })
    initUserInfo()
        // initUserInfo获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) return layer.msg('获取用户信息失败')
                    // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').click(function(e) {
            // preventDefault阻止事件的默认行为 
            e.preventDefault()
            initUserInfo()
        })
        // 监听表单的提交事件
    $('.layui-form').submit(function(e) {
        // preventDefault阻止事件的默认行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // serialize快速获取表单内容
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')
                    // 调用父页面的中的方法重新渲染用户头像和用户的信息
                    // window.parent调用父页面(方法、变量等)
                window.parent.getUserInfo()
            }
        })
    })
})