// IMPORTS
const router = require('express').Router();
const { models: { Category } } = require('../database')

// GET Route for '/api/categories'
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;