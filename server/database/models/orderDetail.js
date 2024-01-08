const Sequelize = require('sequelize');
const { INTEGER, STRING } = Sequelize;
const db = require('../db');

const OrderDetail = db.define('orderDetail', {
    quantity: {
        type: INTEGER,
        allowNull: false,
    },
    price: {
        type: STRING,
        validate: {
            isURL: true,
        }
    }
})

module.exports = OrderDetail;