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

    // console.log('***API Shipping', shippingAddress)
    // console.log('***API Billing', billingAddress)
    // console.log('***API Payment', card)

    await order.update({ total: total });

    await Promise.all(cart.map(async product => {
      const quantity = product.cartProduct.quantity;
      const productInstance = await Product.findOne({ where: { id: product.id } });
      await order.addProduct(productInstance, { through: { quantity: quantity, price: productInstance.price } });
    }))

    const shippingInstance = await Address.findOne({ where: { id: shippingAddress.id } });
    await order.addAddress(shippingInstance, { through: { type: 'Shipping' } });

    const billingInstance = await Address.findOne({ where: { id: billingAddress.id } });
    await order.addAddress(billingInstance, { through: { type: 'Billing' } });

    // const cardInstance = await Card.findOne({ where: { id: card.id } });
    // await order.setCard(cardInstance);

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


// Old PUT Add product to order
// router.put('/', requireToken, async (req, res, next) => {
//   try {
//     const { productId, quantity } = req.body;
//     const order = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         isOpen: true
//       },
//     })
//     const product = await Product.findByPk(productId);
//     let newQty = parseInt(quantity);

//     if (order.products.length) {
//       order.products.map(async orderItem => {
//         if (orderItem.id === parseInt(productId)) {
//           newQty += parseInt(orderItem.orderDetail.quantity);
//         }
//       })
//     }
//     await order.addProduct(product, { through: { quantity: newQty } })
//     const { products: orderItems } = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         isOpen: true
//       },
//       include: Product
//     })
//     res.send(orderItems);
//   } catch (err) {
//     next(err);
//   }
// });

// PUT update cartItem quantity
// router.put('/update', requireToken, async (req, res, next) => {
//   try {
//     const { productId, quantity } = req.body;
//     const cart = await Cart.findOne({
//       where: {
//         userId: req.user.id,
//         isOpen: true
//       },
//       include: Product
//     })
//     const product = await Product.findByPk(productId);

//     await cart.addProduct(product, { through: { quantity: quantity } })
//     const { products: cartItems } = await Cart.findOne({
//       where: {
//         userId: req.user.id,
//         isOpen: true
//       },
//       include: Product
//     })
//     res.send(cartItems);
//   } catch (err) {
//     next(err);
//   }
// });

// Delete cartItem
// router.delete('/', requireToken, async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({
//       where: {
//         userId: req.user.id,
//         isOpen: true,
//       }
//     })
//     const product = await Product.findByPk(req.body.productId);
//     await cart.removeProduct(product);
//     res.send(cart)
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = router;