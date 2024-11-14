const { faker } = require('@faker-js/faker');

const productData = [
  {
    name: 'Documents',
    price: 5,
    // imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 30,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },

  {
    name: 'X-Ray Glasses',
    price: 2,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 25,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'

  },

  {
    name: 'Poison',
    price: 50,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 10,
    categoryId: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },
  {
    name: 'Smoke Bombs',
    price: 20,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 85,
    categoryId: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },
  {
    name: 'Lies',
    price: 15,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 12,
    categoryId: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },
  {
    name: 'Fedora',
    price: 25,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 18,
    categoryId: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },
  {
    name: 'Trench Coat',
    price: 90,
    imageURL: faker.image.urlLoremFlickr({ category: 'abstract' }),
    stockQty: 4,
    categoryId: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo, placeat harum cupiditate quaerat dolore, quidem velit soluta magnam itaque modi aut distinctio unde omnis. Iusto modi vitae corporis iste.'
  },
]

module.exports = productData;