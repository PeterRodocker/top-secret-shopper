const Sequelize = require('sequelize');
const { INTEGER, STRING, DATE } = Sequelize;
const db = require('../db');

const OrderHistory = db.define('orderHistory', {

    orderId: {
        type: INTEGER,
        allowNull: false,
    },
    userId: {
        type: STRING,
        allowNull: false,
    },
    firstName: {
        type: STRING,
        allowNull: false,
    },
    lastName: {
        type: STRING,
        allowNull: false,
    },
    address: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
        allowNull: false,
    },
    totalPrice: {
        type: INTEGER,
        allowNull: false,
    },
    date: {
        type: DATE,
        allowNull: false,
    },

});

module.exports = OrderHistory;