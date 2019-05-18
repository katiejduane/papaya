const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    notes: {
        type: Sequelize.TEXT(),
        allowNull: true

    },
    status: {
        type: Sequelize.STRING(55),
        allowNull: false

    },
    submitted: {
        type: Sequelize.BOOLEAN(),
        allowNull: true,
    },
    uid: {
        type: Sequelize.INTEGER(),
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING(55),
        allowNull: false,
    }

});

module.exports = Project;