const express = require("express");
const db = require("../libs/DBhelper");


const cartRouter = express.Router();

//查询购物车
//get--query
//post--body


//前端 cart/search/10
// search/:id ---> params.id  (vue动态路由传参)  
cartRouter.get("/search/:uId", async function (request, response) {
    let sql = 'select *from  `cats` where uId=? and `cstatus` !=0';
    let parmas = [
        request.params.uId
    ]
    try {
        const result = await db.exec(sql, parmas);
        const status = result && result.length >= 1;
        response.json({ msg: "查询成功", code: Number(status), data: status ? result : '' });
    } catch (error) {
        response.json({ msg: "查询失败", code: -1, error });
    }
})
//加入购物车
cartRouter.post("/add", async function (request, response) {

    //1.根据购买人,购买的产品名称   去数据库的查询
    let querySql = " select * from cats where uId=? and `cstatus` !=0 and `cname`=? ;";
    let queryParams = [
        request.body.uId,
        request.body.cname
    ]
    var queryResult = await db.exec(querySql, queryParams);
    console.log(queryResult);
    if (queryResult && queryResult.length >= 1) {
        // 如果查询到了,已经购买过,修改购买的数据量和金额
        let updateSql = "update cats set `cnum`=cnum+?,`ctotal`= `cnum`*`cprice` where  `cstatus` !=0 and `cname`=? and `uId`=?";
        let updateParams = [
            request.body.cnum,
            request.body.cname,
            request.body.uId
        ]
        let updateResult = await db.exec(updateSql, updateParams);
        if (updateResult && updateResult.affectedRows >= 1) {
            response.json({
                msg: '加入购物车成功(u)',
                code: 1
            })
        } else {
            response.json({
                msg: '加入购物车成功(u)',
                code: 0
            })
        }

    } else {
        //2.如果没购买股过,插入一条新的购买记录
        let insertSQL = " insert into `cats` (`cname`,`cprice`,`cnum`,`cimg`,`uId`,`ctotal`) ";
        insertSQL += "  values(?,?,?,?,?,cnum*cprice);";

        let params = [
            request.body.cname,
            request.body.cprice,
            request.body.cnum,
            request.body.cimg,
            request.body.uId
        ]
        let insertResult = await db.exec(insertSQL, params)
        if (insertResult && insertResult.affectedRows >= 1) {
            response.json({
                msg: '加入购物车成功(i)',
                code: 1
            })
        } else {
            response.json({
                msg: '加入购物车成功(i)',
                code: 0
            })
        }
    }





})


//修改数量
cartRouter.post("/modify", async function (request, response) {
    let sql = "update `cats` set cnum=? ,`ctotal`=`cprice`*`cnum` where `cId`=?;"
    let params = [
        request.body.cnum,
        request.body.cId,
    ]
    try {
        let result = await db.exec(sql, params);
        if (result && result.affectedRows >= 1) {
            response.json({ msg: "修改成功", code: 1 });
        } else {
            response.json({ msg: "修改失败", code: 0 });
        }
    } catch (error) {
        response.json({ msg: "修改失败", code: -1, error });
    }
})

//删除购物车
cartRouter.post("/delete", async function (request, response) {
    let sql = "update `cats` set `cstatus`=0 where `cId`=?; "
    let params = [
        request.body.cId,
    ]
    try {
        let result = await db.exec(sql, params);
        if (result && result.affectedRows >= 1) {
            response.json({ msg: "删除成功", code: 1 });
        } else {
            response.json({ msg: "删除失败", code: 0 });
        }
    } catch (error) {
        response.json({ msg: "删除失败", code: -1, error });
    }
})




module.exports = cartRouter;
