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
        allowNull: true
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: true
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

User.beforeCreate((user, options) => {
    return cryptPassword(user.hash)
    .then(success => {
        user.hash = success
    })
    .catch(err => console.log(err));
});

// i'm not sure the code below will work... or what about error handling?
User.prototype.comparePasswords = async (password) => {
    return await bcrypt.compare(password, this.password)
}

function cryptPassword(password){
    console.log('crypt: ', password)
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return reject(err);
            bcrypt.hash(password, salt, null, (err, hash) => {
                if(err) return reject(err);
                return resolve(hash)
            })
        })
    })
}



// this might be a simpler option than the above code for crypting... play around with both...
// User.beforeCreate((user, options) => {
//     return bcrypt.hash(user.hash, saltRounds)
//         .then(hash => {
//             user.hash = hash;
//         })
//         .catch(err => {
//             throw new Error();
//         });
// });

module.exports = User;