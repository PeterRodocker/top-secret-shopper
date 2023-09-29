const db = require('./db')
const Address = require('./models/address')
const Cart = require('./models/cart')
const CartDetail = require('./models/cartDetail')
const Category = require('./models/category')
const Order = require('./models/order')
const OrderDetail = require('./models/orderDetail')
const OrderHistory = require('./models/orderHistory')
const Payment = require('./models/payment')
const Product = require('./models/product')
const Shipping = require('./models/shipping')
const User = require('./models/user')

// Associations go here

// USER
User.hasMany(Address);
Address.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: CartDetail });
Cart.belongsToMany(Product, { through: CartDetail });

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Order)
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderDetail });
Product.belongsToMany(Order, { through: OrderDetail });

Order.hasOne(Payment);
Payment.belongsTo(Order);

Order.hasOne(Shipping)
Shipping.belongsTo(Order);

User.hasOne(OrderHistory);
OrderHistory.belongsTo(User);

Order.hasOne(OrderHistory);
OrderHistory.belongsTo(Order);

module.exports = {
  db,
  models: {
    Address,
    Cart,
    CartDetail,
    Category,
    Order,
    OrderDetail,
    OrderHistory,
    Payment,
    Product,
    Shipping,
    User,
  }
}