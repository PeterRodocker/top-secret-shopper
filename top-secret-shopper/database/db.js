const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/top_secret_shopper',
  { logging: false }
);

module.exports = db;