const Sequelize = require('sequelize');
const { DATE, STRING, INTEGER } = Sequelize;
const db = require('../db');

const Payment = db.define('payment', {

    orderId: {
        type: DATE,
        allowNull: false,
    },
    paymentMethod: {
        type: STRING,
        allowNull: false,
    },
    amount: {
        type: INTEGER,
        allowNull: false,
    },

});

module.exports = Payment;