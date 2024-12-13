const Sequelize = require('sequelize');
const { INTEGER, STRING } = Sequelize;
const db = require('../db');

const OrderProduct = db.define('orderProduct', {
    quantity: {
        type: INTEGER,
        allowNull: false,
    },
    price: {
        type: STRING,
        allowNull: false,
    }
})

module.exports = OrderProduct;