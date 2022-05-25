import $ from "./libs/jquery.js";
import { fmtDateTime } from "./libs/tools.js";

//固定导航
$(function () {
    let nav = $('.nav').clone(true);
    nav.find('.menu').remove();
    nav.find('.logo').html('<img src="./images/logo-icon-w.png" style="margin-top: 12px;">');
    nav.css({
        position: 'fixed', display: 'none',
        backgroundColor: '#fff', zIndex: 15,
        left: '50%', top: 0,
        marginLeft: '-600px'
    })
    nav.prependTo($('body'));
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 143) {
            nav.show();
        } else {
            nav.hide();
        }
    })
})
$(function () {
    $('.m_box').on('mouseenter', function () {
        $('.sub').hide().eq($(this).index()).show()
    }).on('mouseleave', function () {
        $('.sub').hide()
    })
})

$(function () {
    let index = 0;
    let timer = $('.banner .swiper').get(0).timer;
    let flag = true;
    $('.banner .swiper .next').on('click', function () {
        if (!flag) {
            return
        }
        flag = false;
        index++;
        if (index >= 7) index = 0;
        change()
    }).on('mouseenter', function () {
        $(this).find('i').css('background-position', '-188px -114px')
        clearInterval(timer)
    }).on('mouseleave', function () {
        $(this).find('i').css('background-position', '-234px -114px')
        timer = setInterval(() => {
            index++;
            if (index >= 7) index = 0;
            change()
        }, 2500)
    })
    $('.banner .swiper .prev').on('click', function () {
        if (!flag) {
            return
        }
        flag = false;
        index--;
        if (index < 0) index = 6;
        console.log(index);
        change()
    }).on('mouseenter', function () {
        $(this).find('i').css('background-position', '-280px -114px')
        clearInterval(timer)
    }).on('mouseleave', function () {
        $(this).find('i').css('background-position', '-142px -114px')
        timer = setInterval(() => {
            index++;
            if (index >= 7) index = 0;
            change()
        }, 2500)
    })
    timer = setInterval(() => {
        index++;
        if (index >= 7) index = 0;
        change()
    }, 2500)
    const change = () => {
        $('.banner .swiper li').eq(index).stop().animate({ opacity: 1 }, 1200, () => { flag = true }).siblings().animate({ opacity: 0 }, 800);
        $('.banner .pointer span').eq(index).stop().addClass('current').siblings().removeClass('current');
    }
})

$(function () {
    let index = 0;
    let flag = true;  //节流阀
    let oLi1 = $('.miaosha .timebuy .swiper ul').children().eq(0).clone(true);
    let oLi2 = $('.miaosha .timebuy .swiper ul').children().eq(1).clone(true);
    let oLi3 = $('.miaosha .timebuy .swiper ul').children().eq(2).clone(true);
    oLi1.appendTo($('.miaosha .timebuy .swiper ul'))
    oLi2.appendTo($('.miaosha .timebuy .swiper ul'))
    oLi3.appendTo($('.miaosha .timebuy .swiper ul'))
    let timer = $('.miaosha .timebuy .swiper').timer;
    init();
    let change = () => {
        $('.miaosha .timebuy .swiper ul').stop().animate({ left: -198 * index }, 1000, () => { flag = true })
    }
    function init () {
        timer = setInterval(() => {
            index++;
            if (index >= 10) {
                index = 1;
                $('.miaosha .timebuy .swiper ul').css('left', 0)
            } change()
        }, 1500)
    }
    $('.miaosha .timebuy .swiper').on('mouseenter', function () {
        clearInterval(timer)
    }).on('mouseleave', function () {
        init()
    })
    $('.timebuy .swiper .next').on('click', function () {
        if (!flag) {
            return;
        }
        flag = false;
        index++;
        change()
        if (index >= 10) {
            $('.miaosha .timebuy .swiper ul').animate({ 'left': 0 })
            index = 1;
        } change()
        index = index
    })
    $('.timebuy .swiper .prev').on('click', function () {
        if (!flag) {
            return;
        }
        flag = false;
        index--;
        change()
        if (index <= 0) index = 10 + index
    })
})

$(function () {
    let endDate = new Date(1653827925453)
    setInterval(() => {
        let data = new Date();
        let current = endDate - data;
        let res = fmtDateTime(current, 'array');
        $('.miaosha .time i').eq(0).html(res[2]).next().next().html(res[3]).next().next().html(res[4]).next().next().html(res[5])
        // $('.miaosha .time i').eq(1).html(res[3])
        // $('.miaosha .time i').eq(2).html(res[4])
        // $('.miaosha .time i').eq(3).html(res[5])
    }, 1000)
})
$(function () {
    $('.ppg_top ul>li').on('mouseenter', function (e) {
        let index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $('.ppg_top ul>li>i').removeClass('current').eq(index).addClass('current');
        $('.ppg_main ul').eq(index).addClass('current').siblings().removeClass('current')
    })
})

//右侧购物车
$(function () {
    let flag = 0;
    $('.panel_l a').on('click', function () {
        // console.log($(this).index());
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
                $(this).css('background-color', '#000')
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
})