var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const sequelize = require('./util/database');

const User = require('./models/user');
const Project = require('./models/project');
const Type = require('./models/type');

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

//check DB connection
sequelize
    .authenticate()
    .then(() => {
        console.log('connection was successful!')
    })
    .catch(err => {
        console.log('unable to connect to DB', err)
    })


// create tables and relations
Project.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Project);
Type.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
Project.belongsTo(Type);
Type.hasMany(Project);


// special method in sequelize that is aware of all models/tables and only
// creates new tables if needed (unless 'force' is on)
sequelize
    .sync()
    // .sync({force: true})
    .then(result => {
        return User.findByPk(1)
        // console.log(result);
    })
    .then(user => {
        if(!user){
            User.create({firstname: 'Katie', lastname: 'Duane', email: 'katiejduane@gmail.com'})
        }
        return user;
    })
    .catch(err => {
        // console.log(err);
    })

module.exports = app;
