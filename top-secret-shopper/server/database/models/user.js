const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
    // allowNull: false,
  },
  lastName: {
    type: STRING,
    // allowNull: false,
  },
  email: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   isEmail: true,
    // }
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  }
});

User.findByToken = async function (token) {
  const { userId } = await jwt.verify(token, process.env.JWT);
  const user = await User.findByPk(userId,
    { attributes: ['id', 'username', 'email', 'firstName', 'lastName'] });
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
    // hashPassword(user);
  }
})

module.exports = User;