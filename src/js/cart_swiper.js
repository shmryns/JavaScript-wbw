import $ from "./libs/jquery.js";
import { setCookie, getCookie } from "./libs/tools.js";

const renderGoods = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre += `
        <div class="goods">
        <div class="goods_r">
            <span>
                <input type="checkbox" name="" class="check">
            </span>
            <div class="goods_img">
                <img src="${cur.photo}" alt="">
            </div>
            <div class="goods_txt">
                <p class="p1">${cur.name}</p>
                <p class="p2">${cur.style}</p>
            </div>
            <ul>
                <li class="price">￥<em>${cur.price}</em></li>
                <li class="num"><span class="less">-</span>
                    <input type="number" value="${cur.num}"><span class='add'>+</span>
                </li>
                <li class="total">￥<em>${cur.total}</em></li>
                <li><a href="javascript:void(0)" class="del">删除</a></li>
            </ul>
        </div>
        <div class="bottom"></div>
    </div>
        `
    }, '')
}
const allChecked = () => {
    let checkNum = $('.renderGoods').find('.check').length;
    let isChecked = $('.renderGoods').find('.check:checked').length;
    if (checkNum == isChecked) {
        $('.cn_top .all').prop('checked', true);
    } else {
        $('.cn_top .all').prop('checked', false);
    }
}
const numall = () => {
    let goodsList = JSON.parse(getCookie("sh_cart") || '[]');
    let num = 0;
    goodsList.forEach(function (item) {
        return num += parseInt(item.num)
    })
    $('.top .cart i').html(num);
    $('.wrap>h2>em').html(num);
}

function sumPrice () {
    let goods_sum = 0;
    let price = 0;
    let $all_checked = $(".renderGoods").find("[type='checkbox']:checked");
    Array.from($all_checked).forEach(function (item) {
        goods_sum += parseInt($(item).parents(".goods").find("[type='text']").val());
        price += parseFloat($(item).parents(".goods").find(".total em").text());
    });
    $(".sum").html(goods_sum);
    $(".total_price").html(price);
}
const empty = () => {
    let goodsList = JSON.parse(getCookie("sh_cart") || '[]');
    if (goodsList.length === 0) {
        $('.wrap').hide();
        $('.cart_empty').show();
    } else {
        $('.wrap').show();
        $('.cart_empty').hide();
    }
}
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

$(function () {
    empty();
    //取cookie的值渲染到页面
    let goodsList = JSON.parse(getCookie("sh_cart") || '[]');
    $('.renderGoods').append(renderGoods(goodsList));
    numall();
    //手动改input的值
    $('.renderGoods').on('input', 'input', function () {
        if ($(this).val() == '') {
            return 
        }
        let num = parseInt($(this).val());
        let price = parseFloat($(this).parents(".goods").find(".price em").text());
        $(this).parents(".goods").find(".total em").text(num * price);
        let style = $(this).parents(".goods").find(".goods_txt p").eq(1).text().trim();
        let subtotal = $(this).parents(".goods").find(".total em").text().trim();
        let goodsList = JSON.parse(getCookie('sh_cart'));
        goodsList.forEach(function (item) {
            if (item.style == style) {
                item.num = num;
                item.total = subtotal;
            }
        })
        setCookie("sh_cart", JSON.stringify(goodsList), 1);
        sumPrice()
        numall();
    })

    //减
    $('.renderGoods').on('click', '.less', function () {
        let num = parseInt($(this).next("input").val());
        num == 1 ? num == 1 : num--;
        $(this).next("input").val(num);
        let price = parseFloat($(this).parents(".goods").find(".price em").text());
        $(this).parents(".goods").find(".total em").text(num * price);
        let style = $(this).parents(".goods").find(".goods_txt p").eq(1).text().trim();
        let subtotal = $(this).parents(".goods").find(".total em").text().trim();
        let goodsList = JSON.parse(getCookie('sh_cart'));
        goodsList.forEach(function (item) {
            if (item.style == style) {
                item.num = num;
                item.total = subtotal;
            }
        })
        setCookie("sh_cart", JSON.stringify(goodsList), 1);
        sumPrice()
        numall();
    })
    //加
    $('.renderGoods').on('click', '.add', function () {
        let num = parseInt($(this).prev("input").val());
        num++;
        $(this).prev("input").val(num);
        let price = parseFloat($(this).parents(".goods").find(".price em").text());
        $(this).parents(".goods").find(".total em").text(num * price);
        let style = $(this).parents(".goods").find(".goods_txt p").eq(1).text().trim();
        let subtotal = $(this).parents(".goods").find(".total em").text().trim();
        let goodsList = JSON.parse(getCookie('sh_cart'));
        goodsList.forEach(function (item) {
            if (item.style == style) {
                item.num = num;
                item.total = subtotal;
            }
        })
        setCookie("sh_cart", JSON.stringify(goodsList), 1)
        numall();
        sumPrice()
    })
    //全选
    $('.cn_top .all').prop('checked', false);
    $('.cn_top .all').on('click', function () {
        $('.renderGoods .check').prop("checked", $(this).prop('checked'))
        sumPrice();
    })
    //选中所有全部按钮选中
    $('.renderGoods').on('click', '.check', function () {
        allChecked();
        sumPrice();
    })
    //删除单个商品
    $('.renderGoods').on('click', '.del', function () {
        let index = $(this).parents('.goods').index();
        layer.confirm("<div class='layui-layer-content'><p>确定删除吗?</div>", {
            title: "删除",
            btn: ['删除', '取消']
        }, function () {
            layer.msg('删除中');
            $(".renderGoods").find(".goods").eq(index).remove();
            sumPrice();
            numall();
            let goodsList = JSON.parse(getCookie("sh_cart"));
            goodsList.splice(index, 1);
            setCookie("sh_cart", JSON.stringify(goodsList));
            setTimeout(() => { empty() }, 1000)
        }, function () {
            layer.msg('loading')
        });
    })
    //删除全部商品
    $(".delall").click(function () {
        var $all_checked = $(".renderGoods").find("[type='checkbox']:checked");
        console.log(Array.from($all_checked));
        let goodsList = JSON.parse(getCookie("sh_cart"));

        layer.confirm("<div class='layui-layer-content'><p>确定全部删除吗?</div>", {
            title: "删除",
            btn: ['确定', '取消']
        }, function () {
            layer.msg('删除中');
            for (let i = Array.from($all_checked).length - 1; i >= 0; i--) {
                $(".renderGoods").find(".goods").eq(i).remove();
                goodsList.splice(i, 1);
                setCookie("sh_cart", JSON.stringify(goodsList));
                numall();
                allChecked();
                sumPrice();
                setTimeout(() => { empty() }, 1000)
                $('.cn_top input').prop('checked', false);
            }
        }, function () {
            layer.msg('loading')
        });
        // Array.from($all_checked).forEach(function (item) {
        //     layer.confirm("<div class='layui-layer-content'><p>确定全部删除吗?</div>", {
        //         title: "删除",
        //         btn: ['确定', '取消']
        //     }, function () {
        //         layer.msg('删除中');
        //         setTimeout(function () {
        //             let index = $(item).parents(".goods").index();
        //             $(".renderGoods").find(".goods").eq(index).remove();
        //             goodsList.splice(index, 1);
        //             allChecked();
        //             sumPrice();
        //             numall();
        //             setCookie("sh_cart", JSON.stringify(goodsList));
        //         }, 300);
        //     }, function () {
        //         layer.msg('loading')
        //     });
        // });
    });

    //去结算
    $('.gogo').on('click', function () {
        let sum = $('.fool .sum').text().trim();
        if (sum == 0) {
            layer.alert("还没有选中商品")
        } else {
            var $all_checked = $(".renderGoods").find("[type='checkbox']:checked");
            var arr = [];
            [...$all_checked].forEach(function (item) {
                arr.push($(item).parents('.goods').index())
            })
            let goodsList = JSON.parse(getCookie("sh_cart"))
            let newArr = []
            for (let i = 0; i < arr.length; i++) {
                newArr.push(goodsList[arr[i]])
            }
            sessionStorage.setItem("sh_buy", JSON.stringify(newArr));

            location.replace('./address.html')
        }
    })
})