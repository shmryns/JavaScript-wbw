const express = require("express");
const db = require("../libs/DBhelper");
const md5 = require("md5");
const jwt = require("jwt-simple");

const acconterRouter = express.Router();

//检测用户名是否存在
acconterRouter.get('/checkName', async function (req, res) {
    let sql = `select * from user where uname=?`;
    let params = [req.query.uname];
    let result = await db.exec(sql, params);
    if (result && result.length > 0) {
        res.send({ code: 0, msg: "用户名已存在" });
    } else {
        res.send({ code: 1, msg: "用户名可用" });
    }
})

acconterRouter.post("/login", async function (request, response, next) {
    let sql = "select `uId`,`uname`,`ustatus`  from `user` where `uname`=? and `upwd` =? and `ustatus`=1";
    let params = [
        request.body.uname,
        md5(md5(request.body.upwd) + "cs2203")
    ]

    const result = await db.exec(sql, params);

    const status = result && result.length >= 1;
    if (status) {
        const token = jwt.encode(result[0], "hongs", "HS256");
        response.json({ msg: "登录成功", code: 1, data: result[0], token })
    } else {
        response.json({ msg: "登录失败", code: -1 })
    }

})

acconterRouter.post("/reg", async function (request, response, next) {
    let sql = "insert into `user` (`uname`,`upwd`,uphone)values(?,?,?);";
    let params = [
        request.body.uname,
        md5(md5(request.body.upwd) + "cs2203"),
        request.body.uphone
    ]
    try {
        let result = await db.exec(sql, params);
        var status = result && result.affectedRows >= 1;
        response.json({ msg: status ? "注册成功" : "注册失败", code: Number(status) });
    } catch (error) {
        response.json({ msg: "注册失败", code: -1, error });
    }


})


module.exports = acconterRouter;