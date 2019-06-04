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
}, {
        instanceMethods: {
            authenticate: function (value) {
                if (bcrypt.compareSync(value, this.password))
                    return this;
                else
                    return new Error('Your password does not match!');
                    //or return false? idk, will need to mess with this...
            }
        }
    });

// hash password with bcrypt
User.beforeCreate((user, options) => {
    return bcrypt.hash(user.hash, saltRounds)
        .then(hash => {
            user.hash = hash;
        })
        .catch(err => {
            throw new Error();
        });
});

// code for handling when instance method 'authenticate' fails (returns false)
// function passFail(?){
//     if(User.authenticate === false){
    // do something
//  }
// }


module.exports = User;