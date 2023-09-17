const { faker } = require('@faker-js/faker');

const productData = [
  {
    name: 'Cauliflower',
    price: 4.99,
    // imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 30,
    categoryId: 1
  },

  {
    name: 'Taco',
    price: 1.99,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 25,
    categoryId: 1
  },

  {
    name: 'Pizza',
    price: 49.99,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 10,
    categoryId: 2
  }
]

module.exports = productData;