// IMPORTS
const router = require('express').Router();
const { models: { Product } } = require('../database')

// GET All products /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// GET a single product /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id }
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
});



module.exports = router;