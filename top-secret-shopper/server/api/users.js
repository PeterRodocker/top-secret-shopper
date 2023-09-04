const router = require('express').Router();
const { User } = require('../database/models/user')

// Get all users /api/users
router.get('/', async (req, res, next) => {
  console.log('users get');
  try {
    const users = await User.findAll();
    res.send('users', users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;