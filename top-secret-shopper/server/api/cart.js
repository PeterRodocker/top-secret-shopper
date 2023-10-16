const router = require('express').Router();

const { models: { Cart, Product } } = require('../database');
// const { requireToken, isAdmin } = require('./gateKeepingMiddleware');


router.get('/', async (req, res, next) => {
  try {
    const { products: cartItems } = await Cart.findOne({
      where: {
        userId: req.query.userId,
        isOpen: true
      },
      include: Product
    })
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const cart = Cart.create({ userId: req.query.userId })
    // cart.addProduct(product, { quantity: 4 })
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    const cart = await Cart.findOne({
      where: {
        userId: req.query.userId,
        isOpen: true,
      },
    })
    // cart.setProducts(products)
    res.send(cart)
  } catch (err) {
    next(err);
  }
});


module.exports = router;