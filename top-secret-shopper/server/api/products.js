const router = require('express').Router();
const { Product } = require('../database')

// Get all products /api/products
router.get('/', async (req, res, next) => {
  try {
    console.log('pooooort', process.env)
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// Get single product /api/products/:id
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