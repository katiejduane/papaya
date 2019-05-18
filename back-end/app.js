var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const sequelize = require('./util/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Ornodigin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log('connection was successful!')
    })
    .catch(err => {
        console.log('unable to connect to DB', err)
    })

// sequelize
//     .sync()
//     .then(result => {
//         // console.log(result);
//     })
//     .catch(err => {
//         // console.log(err);
//     })

module.exports = app;
