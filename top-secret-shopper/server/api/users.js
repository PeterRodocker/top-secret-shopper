// IMPORTS
const router = require('express').Router();
const { models: { User } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// Get all users /api/users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// Get single user /api/users
router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'username']
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Post user /api/users
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;