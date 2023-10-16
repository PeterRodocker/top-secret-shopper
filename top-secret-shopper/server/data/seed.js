const { blue, cyan, green, red } = require('chalk');
const { db, models: { Cart, CartDetail, Category, Product, User } } = require('../database');
const cartData = require('./cartData');
const cartDetailData = require('./cartDetailData');
const categoryData = require('./categoryData');
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
    await Cart.bulkCreate(cartData)
    await CartDetail.bulkCreate(cartDetailData)


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

