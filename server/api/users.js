// IMPORTS
const router = require('express').Router();
const { models: { Address, User } } = require('../database');
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

// Post user /api/users
router.put('/update', requireToken, async (req, res, next) => {
  try {
    const { profileFields, profileFields: { id, addresses } } = req.body
    const user = await User.findByPk(id);
    await user.update(profileFields);
    await Promise.all(addresses.map(async address =>
      await Address.update(address, { where: { id: address.id } })))
    const updatedUser = await User.findByPk(id, {
      include: Address
    });
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


