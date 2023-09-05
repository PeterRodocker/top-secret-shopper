// const { blue, cyan, green, red } = require('chalk');
const { db, Product } = require('./database');

async function seed() {
  try {
    // console.log(cyan('📡 Connecting to the database...'));
    console.log('📡 Connecting to the database...');
    // Connect to the database
    await db.sync({ force: true });

    // console.log(blue('🌱 Seeding the database...'));
    console.log('🌱 Seeding the database...');

    // Seed the database
    const cauliflower = await Product.create({
      name: 'Cauliflower',
      price: 4.99,
      imageURL: 'www.cauliflower.com',
      stockQty: 30,
      categoryId: 1
    });

    const taco = await Product.create({
      name: 'Taco',
      price: 1.99,
      imageURL: 'www.tac0.com',
      stockQty: 25,
      categoryId: 1
    });

    const pizza = await Product.create({
      name: 'Pizza',
      price: 49.99,
      imageURL: 'www.pizza.com',
      stockQty: 10,
      categoryId: 2
    });

    // console.log('cauliflower instance >>>>', cauliflower)
    // console.log('cauliflower name >>>>', cauliflower.name)

    // console.log(green('🌲 Finished seeding the database!'));
    console.log('🌲 Finished seeding the database!');
    await db.close();
    console.log("db closed")
  } catch (err) {
    // console.log(red('🔥 An error occured!!'));
    console.log('🔥 An error occured!!');
    console.error(err);
    await db.close();
  }
}
seed();

