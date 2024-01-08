const Sequelize = require('sequelize');
const { INTEGER } = Sequelize;
const db = require('../db');

const CartDetail = db.define('cartDetail', {
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = CartDetail;