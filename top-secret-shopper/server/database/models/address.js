const Sequelize = require('sequelize');
const { INTEGER, STRING } = Sequelize;
const db = require('../db');

const Shipping = db.define('shipping', {

    street: {
        type: STRING,
        allowNull: false,
    },
    city: {
        type: STRING,
        allowNull: false,
    },
    zip: {
        type: INTEGER,
        allowNull: false,
    },
    unit: {
        type: STRING,
        allowNull: false,
    },

});

module.exports = Shipping;