const Sequelize = require('sequelize');
const { ENUM } = Sequelize;
const db = require('../db');

const OrderAddress = db.define('orderAddress', {
  type: {
    type: ENUM('shipping', 'billing', 'both'),
    allowNull: false,
  }
})

module.exports = OrderAddress;