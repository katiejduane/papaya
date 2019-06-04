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
})

// User.beforeCreate((user, options) => {
//     return bcrypt.hash(user.hash, saltRounds)
//         .then(hash => {
//             user.hash = hash;
//         })
//         .catch(err => {
//             throw new Error();
//         });
// });

// // i'm not sure the code below will work the way i want it to... or what about error handling,
// // i'll need to respond with a message that the password doesn't match, no?
// User.prototype.comparePasswords = async (password) => {
//     return await bcrypt.compare(password, this.password)
// }





module.exports = User;