const { models: { User } } = require("../database");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next()
  } catch (e) {
    next(e)
  }
}

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('This Requires Admin authorization');
  } else {
    next();
  }
}

module.exports = {
  requireToken,
  isAdmin
}