import $ from "./libs/jquery.js";
import { code_draw, setCookie, getCookie } from "./libs/tools.js";

class LoginSwper {
    constructor(el) {
        this.el = el;
        this.oSpans = this.el.find(".title span");
        this.oWarp = this.el.find(".warp");
        this.oSm = this.el.find(".sm");
        this.oSj = this.el.find(".warp #canvas");
        this.oCw = this.el.find(".warp .cw");
        this.oYzm = this.el.find(".warp .yzm");
        this.oName = this.el.find("[name=uname]");
        this.oPwd = this.el.find("[name=upwd]");
        this.oCanvas = this.el.find("[name=ucanvas]");
        this.init()
        this.handleChange()
        this.handleClick()
        this.HandleInput()
    }
    init () {
        this.oSpans.eq(0).css('color', '#cc5252')
        this.oWarp.show();
        this.oSm.hide();
        code_draw();
    }
    handleChange () {
        const self = this;
        this.oSpans.eq(0).on('click', function () {
            $(this).css('color', '#cc5252').siblings().css('color', 'grey')
            self.oSm.hide();
            self.oWarp.show();
        })
        this.oSpans.eq(1).on('click', function () {
            $(this).css('color', '#cc5252').siblings().css('color', 'grey')
            self.oSm.show();
            self.oWarp.hide();
        })
    }
    HandleInput () {
        const self = this;
        this.oName.on('focus', function () {
            $(this).css('border-color', '#ddd');
            self.oPwd.css('border-color', '#ddd');
            self.oCw.hide();
        })
        this.oPwd.on('focus', function () {
            $(this).css('border-color', '#ddd');
            self.oName.css('border-color', '#ddd');
            self.oCw.hide();
        })
        this.oCanvas.on('focus', function () {
            $(this).css('border-color', '#ddd');
            self.oYzm.hide();
        })
        this.oSj.on('click', function () {
            code_draw();
        })
    }
    handleClick () {
        const self = this;
        this.el.on('submit', function () {
            if (this.ucanvas.value.trim().toLowerCase() != self.oSj.attr('data-code')) {
                self.oYzm.css('display', 'block');
                self.oCanvas.css('border-color', '#cc5252')
                return false
            }
            var oUser = {
                uname: this.uname.value.trim(),
                upwd: this.upwd.value.trim()
            }
            self.loading(16);
            $.post("http://useker.cn/login", oUser, function (res) {
                if (!res.code) {
                    self.oCw.css('display', 'block');
                    self.oName.css('border-color', '#cc5252');
                    self.oPwd.css('border-color', '#cc5252');
                    self.loading(2);
                    return false;
                }
                self.loading(1);
                localStorage.setItem('sh_user', oUser.uname);
                setTimeout(() => {
                    location = './index.html';    //成功登录
                }, 1000)
            });
            self.oYzm.hide()
            return false;
        })
    }
    loading (a) {
        layer.msg('...', {
            icon: a,
            shade: [0.3, '#000'],
            time: 2800,
            success: function (layero) {
                layero.css({
                    'color': '#fff',
                    'border': 'none',
                    'height': '200px'
                })
                layero.find('.layui-layer-content').css({
                    'text-align': 'center',
                    'padding': '40px 20px 15px 20px'
                })
                layero.find('.layui-layer-content .layui-layer-ico').css({
                    'top': '0',
                    'right': '0',
                    'bottom': '0',
                    'left': '0',
                    'margin': '10px auto'
                })
            }
        })
    }
}

$.fn.extend({
    loginSwper () {
        new LoginSwper(this);
    }
})