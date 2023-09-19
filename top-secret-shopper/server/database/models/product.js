const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
  stockQty: {
    type: INTEGER,
    allowNull: false,
  },
  imageURL: {
    type: STRING,
    validate: {
      isURL: true,
    }
  },
  description: {
    type: STRING,
    allowNull: false,
  }
});

module.exports = Product;