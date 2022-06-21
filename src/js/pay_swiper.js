import $ from "./libs/jquery.js";
import { getCookie, setCookie } from "./libs/tools.js";

$(function () {

})
var total = () => {
    let goodsList = JSON.parse(sessionStorage.getItem("sh_buy"));
    let total = 0;
    console.log(typeof goodsList == 'number');
    if (typeof goodsList == 'number') {
        total = goodsList;
    } else {
        goodsList.forEach(function (item) {
            total += parseInt(item.total)
        })
    }
    $('.total').html(total);
}
countTime();
total();

$(function () {
    $('.main>ul').on('click', function () {
        setTimeout(function () {//做个延迟是因为layer 触发过快            
            layer.photos({
                photos: {
                    'data': [{ 'src': './images/pay/pay.png' }],
                },
                anim: 2,
                area: ['200px', '200px']
            })
        }, 100);
    })
})

function countTime () {
    //获取当前时间  
    var date = new Date();
    var now = date.getTime();
    //设置截止时间  
    var str = "2022/6/12 00:00:00";
    var endDate = new Date(str);
    var end = endDate.getTime();

    //时间差  
    var leftTime = end - now;
    //定义变量 d,h,m,s保存倒计时的时间   
    if (leftTime >= 0) {
        var d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        var h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        var m = Math.floor(leftTime / 1000 / 60 % 60);
        var s = Math.floor(leftTime / 1000 % 60);
    }
    //将倒计时赋值到div中  
    $("#day").html(d);
    $("#hour").html(h)
    $("#min").html(m)
    $("#sec").html(s)
    //递归每秒调用countTime方法，显示动态时间效果  
    setTimeout(countTime, 1000);
};
