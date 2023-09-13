const db = require('./db')
const Cart = require('./models/cart')
const CartDetail = require('./models/cartDetail')
const Category = require('./models/category')
const Product = require('./models/product')
const User = require('./models/user')

// Associations go here
Category.hasMany(Product);
Product.belongsTo(Category);

User.hasOne(Cart)
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: CartDetail });
Cart.belongsToMany(Product, { through: CartDetail });

module.exports = {
  db,
  models: {
    Cart,
    CartDetail,
    Category,
    Product,
    User,
  }
}