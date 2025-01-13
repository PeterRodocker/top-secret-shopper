const { models: { User } } = require("../database");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next()
  } catch (err) {
    next(err)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('This Requires Admin authorization');
    } else {
      next();
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  requireToken,
  isAdmin
}