import $ from "./libs/jquery.js"
import { code_draw } from "./libs/tools.js";
$(function () {
    code_draw();
    $('#canvas').on('click', () => code_draw())
    $('.eye').eq(0).on('click', function () {
        let flag = $(this).toggleClass('current').hasClass('current')
        flag ? $('[name=upwd1]').attr('type', 'text') : $('[name=upwd1]').attr('type', 'password')
    })
    $('.eye').eq(1).on('click', function () {
        let flag = $(this).toggleClass('current').hasClass('current')
        flag ? $('[name=upwd2]').attr('type', 'text') : $('[name=upwd2]').attr('type', 'password')
    })
    $('input').on('focus', function () {
        $('form i').html('').siblings().css('border-color', '#e8e8e8')
    })
    $('input').eq(0).on('input', function () {
        let uname = $(this).val()
        $.get('http://useker.cn/checkName', { uname }, function ({ code, msg }) {
            $('form b').eq(0).html(msg)
            code ? $('form b').eq(0).css('color', 'green') : $('form b').eq(0).css('color', 'red')
        })
    })
    let flag = true;
    $('form').on('submit', function () {
        if (this.upwd1.value.trim() != this.upwd2.value.trim()) {
            $('.mmcw').html('两次密码不一致，请检查您的密码')
            return false
        }
        if (this.ucanvas.value.trim().toLowerCase() != $('#canvas').attr('data-code')) {
            $('#canvas').next().html('图形验证码输入错误').prev().prev().css('border-color', '#cc5252')
            return false
        }
        var oUser = {
            uname: this.uname.value.trim(),
            upwd: this.upwd1.value.trim(),
            uphone: this.uphone.value.trim(),
            uage: 22,
            realname: '金花',
        }
        console.log(oUser);
        if (!(/^\w{1,}$/).test(oUser.uname)) {
            $('form i').eq(0).html("用户名只能是数字,字母,下划线");
            flag = false;
        }
        if (!(/^\w{6,}$/).test(oUser.upwd)) {
            $('.mmcw').html('密码必须6位以上');
            flag = false;
        }
        if (!(/^[1][3-9]\d{9}$/).test(oUser.uphone)) {
            $('form i').eq(3).html("手机号不合法");
            flag = false;
        }
        if (flag) {
            $.post('http://useker.cn/reg', oUser, function ({ code }) {
                if (code) {
                    alert('注册成功')
                    location = './login.html';
                }
            })
        }
        return false;
    })
})