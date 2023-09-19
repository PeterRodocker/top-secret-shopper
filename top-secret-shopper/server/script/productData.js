const { faker } = require('@faker-js/faker');

const productData = [
  {
    name: 'Cauliflower',
    price: 4.99,
    // imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 30,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },

  {
    name: 'Taco',
    price: 1.99,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 25,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'

  },

  {
    name: 'Pizza',
    price: 49.99,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 10,
    categoryId: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  }
]

module.exports = productData;