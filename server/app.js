var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const auth = require("./libs/auth");

var indexRouter = require('./routes/index');
var acconterRouter = require('./routes/acconterRouter');
var cartRouter = require('./routes/cartRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//把我们2阶段写的东西,挂载到服务器上
app.use(express.static(path.join(__dirname, '../src')));

app.use(auth(['/account/login', '/account/reg', '/account/checkName']));
app.use('/', indexRouter);
app.use('/account', acconterRouter);
app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
