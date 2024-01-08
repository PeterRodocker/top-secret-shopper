const router = require('express').Router();

const { models: { Address } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

router.get('/', async (req, res, next) => {
  try {
    res.send('address')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.send('post')
  } catch (err) {
    next(err)
  }
})

router.put('/', requireToken, async (req, res, next) => {
  try {
    res.send('put')
  } catch (err) {
    next(err)
  }
})

module.exports = router;