const Sequelize = require('sequelize');
const { BIGINT, INTEGER, STRING } = Sequelize;
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
  exp: {
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