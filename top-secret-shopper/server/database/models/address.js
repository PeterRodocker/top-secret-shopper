const Sequelize = require('sequelize');
const { ENUM, INTEGER, STRING } = Sequelize;
const db = require('../db');

const Address = db.define('address', {
    street: {
        type: STRING,
        allowNull: false,
    },
    unit: {
        type: STRING,
        allowNull: true,
    },
    city: {
        type: STRING,
        allowNull: false,
    },
    state: {
        type: STRING,
        allowNull: false,
    },
    zip: {
        type: INTEGER,
        allowNull: false,
    },
    type: {
        type: ENUM('Mailing', 'Billing'),
        defaultValue: 'Mailing',
        allowNull: false
    }
});

module.exports = Address;