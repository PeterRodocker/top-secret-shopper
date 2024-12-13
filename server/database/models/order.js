const Sequelize = require('sequelize');
const { BOOLEAN, INTEGER } = Sequelize;
const db = require('../db');

const Order = db.define('order', {
    total: {
        type: INTEGER,
        allowNull: false,
    },
    isOpen: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Order;