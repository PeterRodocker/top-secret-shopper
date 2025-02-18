const Sequelize = require('sequelize');
const { BOOLEAN, INTEGER, STRING } = Sequelize;
const db = require('../db');

const Address = db.define('address', {
    street: {
        type: STRING,
        allowNull: false,
    },
    unit: {
        type: STRING,
        allowNull: false,
        defaultValue: ''
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
    isPrimary: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Address;