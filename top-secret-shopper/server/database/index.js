const db = require('./db')
const Product = require('./models/product')
const User = require('./models/user')
const Category = require('./models/category')

// Associations go here

module.exports = {
  db,
  Product,
  User,
  Category
}