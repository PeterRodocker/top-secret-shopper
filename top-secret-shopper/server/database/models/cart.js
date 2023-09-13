const Sequelize = require('sequelize');
const { DATE } = Sequelize;
const db = require('../db');

const Cart = db.define('cart', {
  creationDate: {
    type: DATE,
    allowNull: false,
  }
})

module.exports = Cart;