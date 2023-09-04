const router = require('express').Router();
const { Product } = require('../database/models/product')

// Get all products /api/products
router.get('/', async (req, res, next) => {
  console.log('products get');
  try {
    // const products = await Product.findAll();
    res.send('products');
  } catch (err) {
    next(err);
  }
});

module.exports = router;