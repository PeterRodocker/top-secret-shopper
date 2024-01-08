const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  }
});

module.exports = Category;