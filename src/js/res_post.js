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
            $('[name="uname"]').next().html("用户名只能是数字,字母,下划线");
            flag = false;
        }
        if (!(/^\w{6,}$/).test(oUser.upwd)) {
            $('.mmcw').html('密码必须6位以上');
            flag = false;
        }
        if (!(/^[1][3-9]\d{9}$/).test(oUser.uphone)) {
            $('[name="uphone"]').next().html("手机号不合法");
            flag = false;
        }
        if (flag) {
            $.post('http://useker.cn/res', oUser, function (res) {
                console.log(res);
            })
        }
        return false;
    })
})