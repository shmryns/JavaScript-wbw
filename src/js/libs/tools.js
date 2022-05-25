export function code_draw () {
    var canvas_width = $('#canvas').width();
    var canvas_height = $('#canvas').height();
    var canvas = document.querySelector('#canvas'); //获取到canvas的对象，演员
    var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0"; //取值范围
    var aCode = sCode.split(",");
    var aLength = aCode.length; //获取到数组的长度
    var value = [];
    for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
        var txt = aCode[j]; //得到随机的一个内容
        value[i] = txt.toLowerCase();
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = code_randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    // 将生成的值以属性的方法添加到元素
    value = value.join("");
    $('#canvas').attr('data-code', value)
    //验证码上显示线条
    for (var i = 0; i <= 5; i++) {
        context.strokeStyle = code_randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    //验证码上显示小点
    for (var i = 0; i <= 30; i++) {
        context.strokeStyle = code_randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

function code_randomColor () { //得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/**
 * 日期格式
 * @param {*} timestamp 时间戳
 * @param {*} format 格式
 * @returns 
 */
export function fmtDateTime (timestamp, format) {
    const pad = function (val, len) {
        val = String(val)
        len = len || 2
        while (val.length < len) val = '0' + val
        return val
    }
    const date = new Date(parseFloat(timestamp))
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hour = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const second = pad(date.getSeconds())
    switch (format) {
        case 'MM-DD HH:MM:SS':
            return [month, day].join('-') + ' ' + [hour, minutes, second].join(':')
        case 'YYYY-MM-DD HH:MM':
            return [year, month, day].join('-') + ' ' + [hour, minutes].join(':')
        case 'YYYY-MM-DD':
            return [year, month, day].join('-')
        case 'MM-DD':
            return [month, day].join('-')
        case 'HH:MM:SS':
            return [hour, minutes, second].join(':')
        case 'HH:MM':
            return [hour, minutes].join(':')
        case 'array':
            return [year, month, day, hour, minutes, second]
        case 'YYYY-MM-DD HH:MM:SS':
            return [year, month, day].join('-') + ' ' + [hour, minutes, second].join(':')
        case 'YYYY年MM月DD日':
            return year + '年' + month + '月' + day + '日'
        case 'YYYY年MM月DD日 HH时MM分':
            return year + '年' + month + '月' + day + '日' + ' ' + hour + '时' + minutes + '分'
        case 'MM月DD日 HH点':
            return month + '月' + day + '日' + ' ' + hour + '点'
        case 'YYYY/MM/DD HH:MM:SS':
            return year + '/' + month + '/' + day + ' ' + [hour, minutes, second].join(':')
        case 'YYYY/MM/DD 午HH:MM:SS':
            if (hour > 12) {
                return year + '/' + month + '/' + day + ' ' + '下午' + (hour - 12) + ':' + minutes + ':' + second
            } else {
                return year + '/' + month + '/' + day + ' ' + '上午' + hour + ':' + minutes + ':' + second
            }
        default:
            return [year, month, day].join('') + ' ' + [hour, minutes, second].join(':')
    }
}
