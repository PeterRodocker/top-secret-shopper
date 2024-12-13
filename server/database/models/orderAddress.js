const Sequelize = require('sequelize');
const { ENUM } = Sequelize;
const db = require('../db');

const OrderAddress = db.define('orderAddress', {
  type: {
    type: ENUM('Shipping', 'Billing'),
    allowNull: false,
  }
})

module.exports = OrderAddress;