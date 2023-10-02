// IMPORTS
const router = require('express').Router();
const { Category } = require('../database/models/category')

// GET Route for '/api/categories'
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

module.exports = router;