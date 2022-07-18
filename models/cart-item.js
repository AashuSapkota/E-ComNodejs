const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNUll: false
    }
})

module.exports = CartItem;