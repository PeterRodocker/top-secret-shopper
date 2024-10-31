import { useContext } from 'react';
import axios from 'axios'

import CartItemView from './CartItemView'
import { deleteFromCart, fetchCart, updateCart } from '../utility/cartFuncs';
import './Cart.css'

import CartContext from '../contexts/CartContext';

const Cart = () => {
  const [cart, setCart] = useContext(CartContext)
  const getSubtotal = () => {
    let subtotal = 0
    cart.map(cartItem => {
      subtotal += (cartItem.cartDetail.quantity * cartItem.price)
    })
    return subtotal
  }

  const handleUpdate = async (productId, quantity, token) => {
    const updatedCart = await updateCart(productId, quantity, token)
    setCart(updatedCart)
  }

  const handleDelete = async (productId, token) => {
    deleteFromCart(productId, token)
    const cart = await fetchCart(token)
    setCart(cart)
  }

  return (
    <>
      <h1>Your Cart</h1>
      <div className='cart__items-container'>
        {cart.length ? cart.map(cartItem => <CartItemView
          cartItem={cartItem}
          key={cartItem.id}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />) :
          <p>No items in your cart</p>}
      </div>
      <div className='subtotal-div'>
        <h2>Subtotal: ${getSubtotal()} </h2>
        <button className='cart__checkout-button'>Checkout</button>
      </div>
    </>
  )
}

export default Cart


