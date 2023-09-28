const db = require('./db')
const Cart = require('./models/cart')
const CartDetail = require('./models/cartDetail')
const Category = require('./models/category')
const OrderHistory = require('./models/orderHistory')
const Product = require('./models/product')
const Shipping = require('./models/shipping')
const User = require('./models/user')
const Order = require('./models/order')
const OrderDetail = require('./models/orderDetail')
const Address = require('./models/address')

// Associations go here
// USER
User.hasOne(Cart)
Cart.belongsTo(User);

User.hasMany(Order)
Order.belongsTo(User);

User.hasMany(Address)
Address.belongsTo(User);

// // CART
// Cart.hasMany(CartDetail);
// CartDetail.belongsTo(Cart);

// CART DETAIL
// CartDetail.belongsTo(Product);


// ORDER

// Order.hasMany(OrderDetail);
// OrderDetail.belongsTo(Order);

Order.hasMany(OrderHistory)

Order.hasOne(Shipping)
Shipping.belongsTo(Order);


// // ORDER DETAIL
Order.belongsTo(Cart, { through: OrderDetail });
Cart.belongsTo(Product, { through: OrderDetail });
// OrderDetail.hasOne(Product);
// OrderDetail.belongsTo(Product);


// ORDER HISTORY
OrderHistory.hasOne(Order);


// SHIPPING
Shipping.hasOne(Address);


// CATEGORY 
Category.hasMany(Product);
Product.belongsTo(Category);


// PRODUCT
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
    Order,
    OrderDetail,
    OrderHistory,
    Shipping,
    Address
  }
}