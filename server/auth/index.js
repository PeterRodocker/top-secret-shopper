// IMPORTS
const router = require('express').Router();
const { models: { User } } = require('../database')

// Signup - listens for POST requests on the '/signup' endpoint
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, firstName, lastName, street, unit, city, state, zip } = req.body;
    const user = await User.create({ username, password, email, firstName, lastName, street, unit, city, state, zip })
    res.send({ token: await user.generateToken() })
  } catch (err) {
    if (err.username === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Username already exists')
    } else {
      next(err)
    }
    if (err.email === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Email already exists')
    } else {
      next(err)
    }
  }
})

// Login - listens for POST requests on the '/login' endpoint
router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send(token)
  } catch (err) {
    next(err)
  }
})

// GET User - listens for GET requests on the '/me' endpoint
router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {})
    res.send(user)
  } catch (ex) {
    next(ex)
  }
})

module.exports = router;


