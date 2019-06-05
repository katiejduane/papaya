const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// hash password with bcrypt
User.beforeCreate((user, options) => {
    return bcrypt.hash(user.hash, saltRounds)
        .then(hash => {
            user.hash = hash;
        })
        .catch(err => {
            console.log(err)
            throw new Error();
        });
});

User.prototype.authenticate = async function (value, callback) {
    // console.log('data:', value, this.hash)
    await bcrypt.compare(value, this.hash, function(err, same){
        if (err){
            // console.log('auth', err)
            callback(err)
        }else{
            // console.log('auth2', err, same)
            callback(err, same)
        }
    })
}


module.exports = User;