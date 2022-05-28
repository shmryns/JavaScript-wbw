import $ from "./libs/jquery.js";
import { getCookie, setCookie, render } from "./libs/tools.js";

//登录人信息
$(function () {
    const init = (uname) => {
        if (uname != null) {
            $('.top .login a').eq(0).html(`您好!&nbsp;&nbsp;&nbsp;wb${uname}`);
            $('.top .login a').eq(1).hide();
            $('.top .login a').eq(2).show();
            $('.login_tip').css('display', 'none');
        }
    }
    let uname = localStorage.getItem('sh_user');
    init(uname);
    //监听登录人信息
    window.addEventListener('storage', function () {
        let uname = localStorage.getItem('sh_user') || undefined;
        init(uname)
    })
})
//加加减减
$(function () {
    $('.upper_r .num .number span').eq(0).on('click', function () {
        let num = parseInt($(this).next().val());
        if (num == 1) {
            return false
        }
        num--;
        $(this).next().val(num);
    })
    $('.upper_r .num .number span').eq(1).on('click', function () {
        let num = parseInt($(this).prev().val());
        num++;
        $(this).prev().val(num);

    })
})

//加入购物车
$(function () {

    const change = (a, b) => {
        let goodsList = JSON.parse(getCookie("sh_cart") || '[]');
        let addNum = 0;
        let addTotal = 0;
        goodsList.forEach(item => addNum += parseInt(item.num));
        goodsList.forEach(item => addTotal += parseFloat(item.total))
        console.log(addTotal);
        if (a == b && b == undefined) {
            $('.cart_bottom i').html(addNum);
            $('.panel_l>a>em').html(addNum);
            $('.cart>span>i').html(addNum);
            $('.cart_bottom b').html(`￥ ${parseFloat(addTotal)}`);
        } else {
            $('.cart_bottom i').html(a);
            $('.panel_l>a>em').html(a);
            $('.cart_bottom b').html(`￥ ${b}`);
        }
    }
    //初始化获取cookie内容
    const init = () => {
        let goodsList = JSON.parse(getCookie("sh_cart") || '[]');
        if (goodsList != false) {
            $('.cart_empty').hide();
            $('.cart_list').append(render(goodsList));
            change();
        } else {
            $('.cart_empty').show();
            change(0, 0);
        }
    }
    init()
    //点击小图标显示
    let flag = 0;
    $('.panel_l a').on('click', function () {
        if ($(this).index() === 0) {
            flag++;
            let num = flag % 2 == 0 ? 1 : 0;
            if (num) {
                $('.panel_r').animate({ right: -262 }, 300)
                $('.panel_l').animate({ right: 0 }, 300)
                $(this).css('background-color', '#fff')
            } else {
                $('.panel_r').animate({ right: 0 }, 300)
                $('.panel_l').animate({ right: 262 }, 300)
                $(this).css('background-color', '#000');
            }
        } if ($(this).index() === 4) {
            $('html,body').animate({ scrollTop: 0 }, 400)
        }
    })
    $('.panel_top i').on('click', function () {
        flag--;
        $('.panel_r').animate({ right: -262 }, 300)
        $('.panel_l').animate({ right: 0 }, 300)
        $('.panel_l a').eq(0).css('background-color', '#fff')
    })
    $('.cart_list').on('mouseenter', '.goods', function () {
        $(this).find('.del').show();
    }).on('mouseleave', '.goods', function () {
        $(this).find('.del').hide();
    }).on('click', '.goods', function ({ target }) {
        if (target.className != 'del') {
            return false
        }
        let style = $(target).parents('.goods').find('.p1').eq(1).text().trim();
        let goodsList = JSON.parse(getCookie("sh_cart") || '[]');
        let index = goodsList.findIndex(item => item.style == style)
        goodsList.splice(index, 1);
        setCookie("sh_cart", JSON.stringify(goodsList), 1);
        $(target).parents('.goods').remove();
        change()
    })

    $('.button .btn').on('click', function () {
        //获取数据存入cookie
        let id = $('.model_b i').text().trim();
        let name = $('.upper_r .title').text().trim();
        let price = $('.upper_r .price .jg i').text().trim();
        let photo = $('.upper_r .style img').attr('src');
        let style = $('.upper_r .style i').text().trim();
        let num = parseInt($('.upper_r .num input').val());
        let total = parseFloat(price) * parseInt(num);
        var goods = { id, name, price, photo, style, num, total };
        let cart = getCookie("sh_cart");
        let goodsList = cart ? JSON.parse(cart) : [];
        let length = goodsList.length;
        let flag = false;
        goodsList.forEach(function (item) {
            if (item.id == id) {
                flag = true;
                let itemNum = parseInt(item.num);
                item.num = itemNum + num;
                item.total += parseFloat(total);
            }
        })
        if (!flag) {
            goodsList.push(goods);
        }
        setCookie("sh_cart", JSON.stringify(goodsList), 1)   //1表示一天
        //飞入购物车
        let $img = $('.upper_r .style span img').clone(true);
        $img.appendTo('.upper_r .style .box');
        $img.animate({
            top: $('.panel_l').offset().top + 20,
            left: $('.panel_l').offset().left + 20,
            width: 10,
            height: 10
        }, 1000, () => {
            $img.remove();
            change()
            for (let i = 0; i < goodsList.length; i++) {
                if ($('.cart_list .goods i').eq(i).text().trim() != goodsList[i].num) {
                    $('.cart_list .goods i').eq(i).html(goodsList[i].num)
                }
            }
            if (goodsList.length != length) {
                $('.cart_list .goods').remove();
                init()
            }
        })
    })
});

//商品详情放大镜效果
$(function () {
    let index = 0;
    $('.bottom ul img').eq(index).css('opacity', 1);
    $('.img_wrap img').eq(index).show();
    $('.big_img img').eq(index).show().siblings().hide();
    $('.bottom  li').on('mouseenter', function () {
        index = $(this).index();
        $('.bottom ul img').css('opacity', 0.5);
        $('.bottom ul img').eq(index).css('opacity', 1);
        $('.img_wrap img').eq(index).show().siblings().hide();
        $('.big_img img').eq(index).show().siblings().hide();
    })
    $('.img_wrap').on('mouseenter', function () {
        $('.big_img').show();
        $('.smallArea').show();
    }).on('mousemove', function ({ pageX, pageY }) {
        let mX = pageX - $('.img_wrap img').eq(index).offset().left - $('.smallArea').width() / 2;
        let mY = pageY - $('.img_wrap img').eq(index).offset().top - $('.smallArea').height() / 2;
        if (mX <= 9) mX = 9;
        if (mY <= 9) mY = 9;
        if (mX >= $('.img_wrap img').eq(index).width() + 9 - $('.smallArea').width()) mX = $('.img_wrap img').eq(index).width() + 9 - $('.smallArea').width()
        if (mY >= $('.img_wrap img').eq(index).height() + 9 - $('.smallArea').height()) mY = $('.img_wrap img').eq(index).height() + 9 - $('.smallArea').height()
        $('.smallArea').css({ left: mX, top: mY })
        $('.big_img img').css({ left: -2 * mX, top: -2 * mY })
    }).on('mouseleave', function () {
        $('.big_img').hide();
        $('.smallArea').hide();
    })
})


