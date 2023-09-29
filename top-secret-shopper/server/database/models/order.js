const Sequelize = require('sequelize');
const { DATE, INTEGER } = Sequelize;
const db = require('../db');

const Order = db.define('order', {
    orderDate: {
        type: DATE,
        allowNull: false,
    },
    totalAmount: {
        type: INTEGER,
        allowNull: false,
    },
});

module.exports = Order;