const db = require('./db')
const Address = require('./models/address')
const Card = require('./models/card')
const Cart = require('./models/cart')
const CartProduct = require('./models/cartProduct')
const Category = require('./models/category')
const Order = require('./models/order')
const OrderAddress = require('./models/orderAddress')
const OrderProduct = require('./models/orderProduct')
const Product = require('./models/product')
const Shipping = require('./models/shipping')
const User = require('./models/user')

// Associations go here

User.hasMany(Address);
Address.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: CartProduct });
Cart.belongsToMany(Product, { through: CartProduct });

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Order)
Order.belongsTo(User);

User.hasMany(Card);
Card.belongsTo(User)

Order.belongsToMany(Address, { through: OrderAddress });
Address.belongsToMany(Order, { through: OrderAddress });

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Card.hasOne(Order);
Order.belongsTo(Card);

Order.hasOne(Shipping)
Shipping.belongsTo(Order);

module.exports = {
  db,
  models: {
    Address,
    Cart,
    CartProduct,
    Category,
    Order,
    OrderProduct,
    Card,
    Product,
    Shipping,
    User,
  }
}