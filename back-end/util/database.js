const Sequelize = require('sequelize');

const sequelize = new Sequelize('papaya', 'kathrynduane', 'papaya', {
    dialect: 'postgresql',
    host: 'localhost'
})

module.exports = sequelize;