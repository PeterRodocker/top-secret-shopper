const router = require('express').Router();
const { Category } = require('../database/models/category')

// Get all categories /api/categories
router.get('/', async (req, res, next) => {
  console.log('products get');
  try {
    const categories = await Category.findAll();
    res.send('categories', categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;