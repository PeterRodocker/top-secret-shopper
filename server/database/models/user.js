const Sequelize = require('sequelize');
const { BOOLEAN, STRING, VIRTUAL } = Sequelize;
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 5;
const Address = require('./address')
const Order = require('./order')
const Product = require('./product')
const Card = require('./card')

const User = db.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  fullName: {
    type: VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  }
});

User.findByToken = async function (token) {
  const { userId } = await jwt.verify(token, process.env.JWT);
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      { model: Address },
      { model: Order, include: { model: Address } },
      { model: Order, include: { model: Product } },
      { model: Card, attributes: { exclude: ['exp', 'cvv'] } }
    ]
  });
  if (!user) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  return user;
}

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne(
    { where: { username } }
  );
  if (!user) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  if (await bcrypt.compare(password, user.password)) {
    return user.generateToken();
  }
}

User.prototype.generateToken = function () {
  const token = jwt.sign({ userId: this.id }, process.env.JWT);
  return token;
}

const hashPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate(async (users) => {
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
})

module.exports = User;