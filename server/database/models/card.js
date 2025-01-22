const Sequelize = require('sequelize');
const { BIGINT, ENUM, INTEGER, STRING } = Sequelize;
const db = require('../db');

const Card = db.define('card', {
  name: {
    type: STRING,
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  number: {
    type: BIGINT,
    allowNull: false,
    get() {
      return `********${parseInt(this.getDataValue('number').toString().substr(-4))}`;
    }

  },
  expMonth: {
    type: ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    allowNull: false,
  },
  expYear: {
    type: INTEGER,
    allowNull: false,
  },
  cvv: {
    type: INTEGER,
    allowNull: false,
  },
  nickname: {
    type: STRING,
    allowNull: true
  }
});

module.exports = Card;