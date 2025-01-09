const router = require('express').Router();

const { models: { Address, Order, Card, Product } } = require('../database');
const { requireToken } = require('./gateKeepingMiddleware');

// GET Fetch open order
router.get('/', requireToken, async (req, res, next) => {
  try {
    const { products: orderItems } = await Order.findOne({
      where: {
        userId: req.user.id,
        isOpen: true
      },
      include: [Address, Card, Product]
    })
    res.send(orderItems);
  } catch (err) {
    next(err);
  }
});

// POST Create new order
router.post('/', requireToken, async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      total: 0,
      isOpen: true
    })

    res.send(order);
  } catch (err) {
    next(err);
  }
});

// PUT Add order details
router.put('/', requireToken, async (req, res, next) => {
  try {
    const { cart, shippingAddress, billingAddress, card, total } = req.body;

    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isOpen: true,
      }
    })

    await order.update({ total: total });

    await Promise.all(cart.map(async product => {
      const quantity = product.cartProduct.quantity;
      const productInstance = await Product.findOne({ where: { id: product.id } });
      await order.addProduct(productInstance, { through: { quantity: quantity, price: productInstance.price } });
    }))

    if (shippingAddress.id === billingAddress.id) {
      const addressInstance = await Address.findOne({ where: { id: shippingAddress.id } });
      await order.addAddress(addressInstance, { through: { type: 'both' } });
    } else {
      const shippingInstance = await Address.findOne({ where: { id: shippingAddress.id } });
      await order.addAddress(shippingInstance, { through: { type: 'shipping' } });

      const billingInstance = await Address.findOne({ where: { id: billingAddress.id } });
      await order.addAddress(billingInstance, { through: { type: 'billing' } });
    }

    const cardInstance = await Card.findOne({ where: { id: card.id } });
    await order.setCard(cardInstance);

    const updatedOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        isOpen: true,
      },
      include: [Address, Card, Product]
    })

    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
});

router.put('/close', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isOpen: true,
      }
    })
    const closedOrder = await order.update({ isOpen: false });
    res.send(closedOrder)
  } catch (err) {
    next(err)
  }
})



module.exports = router;