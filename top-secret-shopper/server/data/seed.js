const { blue, cyan, green, red } = require('chalk');
const { db, models: { Category, Product, User } } = require('../database');
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

