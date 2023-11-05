const router = require('express').Router();

const { models: { Cart, Product } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// GET Get cart
router.get('/', requireToken, async (req, res, next) => {
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

// POST Create new cart
router.post('/', async (req, res, next) => {
  try {
    const cart = await Cart.create({
      userId: req.query.userId,
      isOpen: true
    })
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// PUT add/update cartItem
router.put('/', async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({
      where: {
        userId: req.query.userId,
        isOpen: true
      },
      include: Product
    })
    const product = await Product.findByPk(productId);
    await cart.addProduct(product, { through: { quantity: quantity } })
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

// PUT Add/Update multiple items to cart
// router.put('/', async (req, res, next) => {
//   try {
//     const { productsToAdd } = req.body
//     const cart = await Cart.findOrCreate({
//       where: {
//         userId: req.query.userId,
//         isOpen: true,
//       },
//       include: Product
//     })
//     productsToAdd.map(async productToAdd => {
//       const { productId, quantity } = productToAdd;
//       const product = await Product.findByPk(productId);
//       cart[0].addProduct(product, { through: { quantity: quantity } });
//     })
//     res.send(cart)
//   } catch (err) {
//     next(err);
//   }
// });

// Delete cartItem
router.delete('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.query.userId,
        isOpen: true,
      }
    })
    const product = await Product.findByPk(req.body.productId);
    cart.removeProduct(product);
    res.send(cart)
  } catch (err) {
    next(err);
  }
});


module.exports = router;