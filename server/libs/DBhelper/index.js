const mysql = require("mysql");

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: "zouxiu"
})


const exec = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log("连接数据库失败!");
                reject(err.message);
            }
            conn.query(sql, params, function (err, result) {
                if (err) {
                    console.log("执行sql语句失败!:" + err.message);
                    reject(err.message);
                }
                resolve(result)
                conn.release();
            })
        })
    })
}

module.exports = {
    exec
}