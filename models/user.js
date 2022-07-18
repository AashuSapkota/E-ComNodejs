const Sequlelize = require('sequelize');

const sequelize = require('../util/database');


const User = sequelize.define('user', {
    id: {
        type: Sequlelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequlelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequlelize.STRING,
        allowNull: false
    }
});


module.exports = User;