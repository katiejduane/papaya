const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Type = sequelize.define('type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    typename: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Type;