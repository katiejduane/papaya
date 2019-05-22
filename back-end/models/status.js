const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Status = sequelize.define('status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    statusname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Status;