const router = require('express').Router();

const { models: { Cart, Product } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// GET Fetch cart
router.get('/', requireToken, async (req, res, next) => {
  try {
    const { products: cartItems } = await Cart.findOne({
      where: {
        userId: req.user.id,
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
router.post('/', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.create({
      userId: req.user.id,
      isOpen: true
    })
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// PUT Add product to cart
router.put('/', requireToken, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        isOpen: true
      },
      include: Product
    })
    const product = await Product.findByPk(productId);
    let newQty = parseInt(quantity);

    if (cart.products.length) {
      cart.products.map(async cartItem => {
        if (cartItem.id === parseInt(productId)) {
          newQty += parseInt(cartItem.cartDetail.quantity);
        }
      })
    }
    await cart.addProduct(product, { through: { quantity: newQty } })
    const { products: cartItems } = await Cart.findOne({
      where: {
        userId: req.user.id,
        isOpen: true
      },
      include: Product
    })
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// PUT update cartItem quantity
router.put('/update', requireToken, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        isOpen: true
      },
      include: Product
    })
    const product = await Product.findByPk(productId);

    await cart.addProduct(product, { through: { quantity: quantity } })
    const { products: cartItems } = await Cart.findOne({
      where: {
        userId: req.user.id,
        isOpen: true
      },
      include: Product
    })
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// Delete cartItem
router.delete('/', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        isOpen: true,
      }
    })
    const product = await Product.findByPk(req.body.productId);
    await cart.removeProduct(product);
    res.send(cart)
  } catch (err) {
    next(err);
  }
});


module.exports = router;