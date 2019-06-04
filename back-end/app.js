var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const helmet = require('helmet');

const bcrypt = require('bcrypt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const sequelize = require('./util/database');

const User = require('./models/user');
const Project = require('./models/project');
const Type = require('./models/type');
const Status = require('./models/status');

//a VERY TEMPORARY secret for testing issuing tokens, will be moved to config or .ENV later
const secret = 'shhhh'

var app = express();

app.use(helmet());

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
Project.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Project);
Type.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Project.belongsTo(Type);
Type.hasMany(Project);
Status.hasMany(Project);
Project.belongsTo(Status);

// sequelize sync
sequelize
    .sync()
    // .sync({force: true})
    .then(result => {
        return User.findByPk(1)
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            User.create({ firstname: 'Katie', lastname: 'Duane', email: 'katiejduane@gmail.com', hash:'xxxxxx' })
        }
        return Status.findByPk(1);
    })
    .then(status => {
        if (!status) {
            Status.bulkCreate([
                { statusname: 'Idea', color: 'papayawhip' },
                { statusname: 'Research', color: 'lavender' },
                { statusname: 'In-Progress', color: 'palevioletred' },
                { statusname: 'Revision', color: 'lightsalmon' },
                { statusname: 'Finished', color: 'lightblue' },
                { statusname: 'Submitted', color: 'mintcream' },
                { statusname: 'Accepted', color: 'palegoldenrod' }])
        }
        return Type.findByPk(1)
    })
    .then(type => {
        if (!type) {
            Type.create({ typename: 'Misc', userId: 1 })
        }
        return Project.findByPk(1)
    })
    .then(project => {
        if (!project) {
            Project.create({ name: 'First project!', notes: 'Add details here', userId: 1, typeId: 1, statusId: 1 })
        }
    })
    .catch(err => {
        console.log(err);
    })

module.exports = app;