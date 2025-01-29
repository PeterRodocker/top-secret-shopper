const router = require('express').Router();
const { Sequelize } = require('sequelize')

const { models: { Address, Card, Cart, CartProduct, Order, Product } } = require('../database');
const { requireToken } = require('./gateKeepingMiddleware');

// GET Fetch all orders for user
router.get('/', requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        Address,
        Card,
        Product,
        // Cart
        // {
        //   model: Cart, where: {
        //     id: Sequelize.col('Order.cartId')
        //   }
        // }
      ]
    })
    res.send(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send({ error: 'An error occurred while fetching orders' });
  }
});

// model.findAll({
//   attributes: [
//       'id',
//       [sequelize.fn('date_format', sequelize.col('date_col'), '%Y-%m-%d'), 'date_col_formed']
//   ]})
//   .then(function(result) {
//     console.log(result);
//   });

// GET Fetch individual order
router.get('/:orderId', requireToken, async (req, res, next) => {
  try {
    const { products: orderItems } = await Order.findOne({
      where: {
        userId: req.user.id,
        id: req.params.orderId,
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
      cartId: 1,
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

    await order.update({ cartId: cart.id, total: total });

    await Promise.all(cart.products.map(async product => {
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