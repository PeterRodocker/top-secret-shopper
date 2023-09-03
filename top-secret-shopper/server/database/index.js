const db = require('./db')
const Product = require('./models/product')
const User = require('./models/user')
const Category = require('./models/category')

module.exports = {
  db,
  Product,
  User,
  Category
}