const Sequelize = require('sequelize');
const { INTEGER, DATE, STRING } = Sequelize;
const db = require('../db');

const Shipping = db.define('shipping', {

    orderId: {
        type: INTEGER,
        allowNull: false,
    },
    shippingMethod: {
        type: STRING,
        allowNull: false,
    },
    shippingDate: {
        type: DATE,
        allowNull: false,
    },
    deliveryDate: {
        type: DATE,
        allowNull: false,
    },

});

module.exports = Shipping;