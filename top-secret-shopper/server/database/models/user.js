const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

User.findByToken = async function (token) {
  const { userId } = await jwt.verify(token, process.env.JWT);
  const user = await User.findByPk(userId);
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

User.beforeCreate(async function (user) {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

module.exports = User;