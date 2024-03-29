const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
})

module.exports = Cart;