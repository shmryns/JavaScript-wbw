import $ from "./libs/jquery.js";
import { getCookie, setCookie } from "./libs/tools.js";


//登录人信息
$(function () {
    const init = (uname) => {
        if (uname != null) {
            $('.w_header_right li').eq(0).find('a').html(`您好!&nbsp;&nbsp;&nbsp;wb${uname}`);
            $('.w_header_right li').eq(1).hide();
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

function sumPrice () {
    var price = 0;
    var $subtotal_span = $(".subtotal span");
    Array.from($subtotal_span).forEach(function (item) {
        price += parseFloat($(item).text());
    });
    $(".total_price span").text(price);
}
const numall = () => {
    let goodsList = JSON.parse(sessionStorage.getItem("sh_buy") || '[]');
    let num = 0;
    goodsList.forEach(function (item) {
        return num += parseInt(item.num)
    })
    $('.prompt_txt b').html(num);
}
//从sessionStorage中取值放入购物车
$(document).ready(function () {
    $("store_goods").show();
    var cart = sessionStorage.getItem("sh_buy");
    var sum = 0;
    if (cart) {
        var goodsList = JSON.parse(cart);
        console.log(goodsList);
        var html = ""
        goodsList.forEach(function (item, index) {
            //总计
            html +=
                '<ul class="clearfix store_goods"><li class="fl "><div class="goods_img"><img src="' +
                item.photo + '"/></div></li><li class="fl goods_txt"><p>' + item.name + '</p><p>' + item.style + '</p><p>七天退换</p></li><li class="fl price">￥<span>' + item.price +
                '</span></li><li class="fl goods_num clearfix"><span class="less_btn fl">-</span><input class="num fl" type="text" value="' +
                item.num +
                '" name="" readonly/><span class="add_btn fl">+</span></li><li class="fl subtotal">¥<span>' +
                item.total +
                '</span></li></ul>';
        });
    }
    $(".goods_content").html(html);
    sumPrice();
    numall()
})
//减
$(".goods_content").on("click", ".less_btn", function () {
    var num = parseInt($(this).next("input").val());
    if (num == 1) {
        num = 1

    } else {
        num--;
    };
    let price = parseFloat($(this).parents(".store_goods").find(".price span").text());
    $(this).parents(".store_goods").find(".subtotal span").text(num * price);
    $(this).next("input").val(num);
    sumPrice();
    let style = $(this).parents(".store_goods").find(".goods_txt p").eq(1).text().trim();
    let subtotal = $(this).parents(".store_goods").find(".subtotal span").text().trim();
    let goodsList = JSON.parse(getCookie('sh_cart'));
    goodsList.forEach(function (item) {
        if (item.style == style) {
            item.num = num;
            item.total = subtotal;
        }
    })
    setCookie("sh_cart", JSON.stringify(goodsList), 1);
    numall();
});
//加
$(".goods_content").on("click", ".add_btn", function () {
    var num = parseInt($(this).prev("input").val());
    num++;
    let price = parseFloat($(this).parents(".store_goods").find(".price span").text());
    $(this).prev("input").val(num);
    $(this).parents(".store_goods").find(".subtotal span").text(num * price);
    sumPrice();
    let style = $(this).parents(".store_goods").find(".goods_txt p").eq(1).text().trim();
    let subtotal = $(this).parents(".store_goods").find(".subtotal span").text().trim();
    let goodsList = JSON.parse(getCookie('sh_cart'));
    goodsList.forEach(function (item) {
        if (item.style == style) {
            item.num = num;
            item.total = subtotal;
        }
    })
    setCookie("sh_cart", JSON.stringify(goodsList), 1);
    numall();
});




//三级联动
new PCAS("province", "city", "area");
// 添加收货地址
$(".add_address").click(function () {
    layer.open({
        type: 1,
        area: ['780px', '456px'], //宽高
        content: $(".info_box"),
        closeBtn: 0,
    });
});

$(".cancel_btn").click(function () {
    layer.closeAll();
    $(".info_box").hide();
});
//添加收货地址
var addressList = [];
$(".save_btn").click(function () {
    var name = $(".info_box .name_box input").val();
    var tel = $(".info_box .tel_box input").val();
    var street = $(".info_box .street_box input").val();
    var province = $(".info_box select[name='province']").val();
    var city = $(".info_box select[name='city']").val();
    var area = $(".info_box select[name='area']").val();
    var addressStr = {
        name: name,
        tel: tel,
        street: street,
        province: province,
        city: city,
        area: area,
    }
    if (name == "") {
        $('.name_box span').html('姓名不能为空');
        return false;
    } else {
        $('.name_box span').html();
    }
    if (!(/^[1][3-9]\d{9}$/).test(tel)) {
        $('.tel_box span').html('输入的手机号不合法');
        return false;
    } else {
        $('.tel_box span').html();
    }
    addressList.unshift(addressStr);
    layer.closeAll();
    $(".info_box").hide();
    allAddress();
    return false;
});
//清空提示
$(".info_box .name_box input").focus(function () {
    $('.name_box span').html();
    $('.tel_box span').html();
});
$(".info_box .tel_box input").focus(function () {
    $('.name_box span').html();
    $('.tel_box span').html();
});

function allAddress () {
    var _html = "";
    addressList.forEach(function (item) {
        _html += '<div class="address fl"><p><span>' + item.name + '&nbsp;</span><span>' + item
            .tel + '</span></p><p><i class="iconfont icon-zb"></i><span class="province">' + item.province +
            '</span><span class="city">' + item.city + '</span><span class="area">' + item.area +
            '</span></p><p>' + item.street + '</p><span class="address_cover">删除</span></div>';
    });
    $(".address_box").html(_html);
}
$('.borderLeft').on('click', '.address_cover', function () {
    $(this).parents(".address").remove()
})


$(".address_box").on("click", ".address", function () {
    $(this).addClass("style").siblings().removeClass("style");
    $(this).find("i").addClass("red").parents(".address").siblings().find("i").removeClass("red");
    $(this).find("p:first").addClass("red").parents(".address").siblings().find("p:first").removeClass("red");
});