const { faker } = require('@faker-js/faker');


const productData = [
  {
    name: 'Documents',
    price: 5,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 30,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },

  {
    name: 'X-Ray Glasses',
    price: 2,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 25,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'

  },

  {
    name: 'Poison',
    price: 50,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 10,
    categoryId: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
  {
    name: 'Smoke Bombs',
    price: 20,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 85,
    categoryId: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
  {
    name: 'Lies',
    price: 15,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 12,
    categoryId: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
  {
    name: 'Fedora',
    price: 25,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 18,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
  {
    name: 'Trench Coat',
    price: 90,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 4,
    categoryId: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
  {
    name: 'Secret Identity',
    price: 180,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 7,
    categoryId: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
  {
    name: 'Brief Case',
    price: 70,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 120,
    categoryId: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore.'
  },
]

module.exports = productData;