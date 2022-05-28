
import $ from "./libs/jquery.js";
//登录人信息
$(function () {
    const init = (uname) => {
        if (uname != null) {
            $('.w_header_right>li>a').eq(0).html(`您好!&nbsp;&nbsp;&nbsp;wb${uname}`);
            $('.w_header_right>li>a').eq(1).hide();
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
// 头部左侧下拉框
let flag
$(".w_all_menu").mouseenter(function () {
    if ($(".w_left_menu").css("display") == 'none') $(".w_left_menu").slideDown();
})
$(".w_left_menu").mouseleave(function () {
    $(".w_left_menu").slideUp()
});

// 价格排序
$(".sort_price").click(function () {
    $(this).addClass("color-orange").siblings().removeClass("color-orange");
    var $priceBox = Array.from($(".commodity_bottom_photo li"));
    var sort = parseInt($(this).data("sort"));
    if (sort == 1) {
        $(this).text("价格从低到高");
    } else {
        $(this).text("价格从高到低");
    }
    $priceBox.sort(function (itemA, itemB) {
        var priceA = $(itemA).find('.price>span').text();
        var priceB = $(itemB).find('.price>span').text();
        var mathA = parseFloat(priceA.replace(/[¥,]/g, ""));
        var mathB = parseFloat(priceB.replace(/[¥,]/g, ""));
        return (mathA - mathB) * sort;
    })
    $(this).data('sort', -sort);
    $('.commodity_bottom_photo>ul').empty().append($priceBox);
});