const Sequelize = require('sequelize');
const { INTEGER, STRING } = Sequelize;
const db = require('../db');

const OrderDetail = db.define('orderDetail', {
    // orderId: {
    //     type: INTEGER,
    //     allowNull: false,
    // },
    // productId: {
    //     type: INTEGER,
    //     allowNull: false,
    // },
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