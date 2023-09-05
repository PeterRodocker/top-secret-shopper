const db = require('./db')
const Product = require('./models/product')
const User = require('./models/user')
const Category = require('./models/category')

// Associations go here
User.belongsToMany(Product, { through: 'userProducts' });
Product.belongsToMany(User, { through: 'userProducts' });

module.exports = {
  db,
  Product,
  User,
  Category
}