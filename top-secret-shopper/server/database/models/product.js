const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Product;