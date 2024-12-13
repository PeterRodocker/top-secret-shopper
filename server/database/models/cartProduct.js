const Sequelize = require('sequelize');
const { INTEGER } = Sequelize;
const db = require('../db');

const CartProduct = db.define('cartProduct', {
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = CartProduct;