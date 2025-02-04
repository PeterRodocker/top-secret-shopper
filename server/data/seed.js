const { blue, cyan, green, red } = require('chalk');
const { db, models: { Address, Cart, CartProduct, Category, Card, Order, OrderProduct, Product, User } } = require('../database');

const addressData = require('./addressData');
const cartData = require('./cartData');
const cartProductData = require('./cartProductData');
const categoryData = require('./categoryData');
const cardData = require('./cardData');
const orderData = require('./orderData');
const orderProductData = require('./orderProductData');
const productData = require('./productData');
const userData = require('./userData');

async function seed() {
  try {
    console.log(cyan('📡 Connecting to the database...'));
    // Connect to the database
    await db.sync({ force: true });
    console.log(blue('🌱 Seeding the database...'));

    await Category.bulkCreate(categoryData)
    await Product.bulkCreate(productData)
    await User.bulkCreate(userData)
    await Address.bulkCreate(addressData)
    await Cart.bulkCreate(cartData)
    await CartProduct.bulkCreate(cartProductData)
    await Card.bulkCreate(cardData)
    // await Order.bulkCreate(orderData)
    // await OrderProduct.bulkCreate(orderProductData)
    // await OrderAddress.bulkCreate(orderAddressData)

    console.log(green('🌲 Finished seeding the database!'));
    await db.close();
    console.log("db closed")
  } catch (err) {
    console.log(red('🔥 An error occured!!'));
    console.error(err);
    await db.close();
  }
}
seed();

