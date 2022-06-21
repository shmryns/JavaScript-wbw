const jwt = require("jwt-simple");
module.exports = function (list) {
    return function (req, res, next) {
        console.log(req.url.split('?')[0]);
        console.log(list.indexOf(req.url.split('?')[0]) > -1);
        if (list.indexOf(req.url.split('?')[0]) > -1) {
            next();
        } else {
            try {
                //验证token
                var token = req.headers.token || req.body.token || req.query.token || req.cookies.token;
                if (token == undefined) {
                    token = req.headers.authorization.split(" ")[1];
                }
                jwt.decode(token, "hongs")
                next()
            } catch (error) {
                res.json({ msg: "请先登录", code: -1 })
            }
        }
    }
}