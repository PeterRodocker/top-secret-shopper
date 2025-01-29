import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import CartItemView from './CartItemView'
import { deleteFromCart, fetchCart, updateCart } from '../utility/cartFuncs';
import './Cart.css'

import CartContext from '../contexts/CartContext';

const Cart = () => {
  const [cart, setCart] = useContext(CartContext)
  const { products: cartItems } = cart
  const navigate = useNavigate()
  let subtotal = 0

  const getSubtotal = () => {
    cartItems.map(cartItem => {
      subtotal += (cartItem.cartProduct.quantity * cartItem.price)
    })
  }

  getSubtotal()

  const handleUpdate = async (e, productId, quantity, token) => {
    e.preventDefault()
    const updatedCart = await updateCart(productId, quantity, token)
    setCart(updatedCart)
  }

  const handleDelete = async (e, productId, token) => {
    e.preventDefault()
    await deleteFromCart(productId, token)
    const cart = await fetchCart(token)
    setCart(cart)
  }

  return (
    <>
      <h1>Your Cart</h1>
      <div className='cart_items-container'>
        {cartItems.length ? cartItems.map(cartItem => <CartItemView
          cartItem={cartItem}
          key={cartItem.id}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />) :
          <h3 className='no-items'>You Have No Items In Your Cart</h3>}
      </div>

      <div className='subtotal-div'>
        {subtotal > 0 && <h2>Order Subtotal: ${subtotal} </h2>}
        <button
          className='cart_checkout-button'
          onClick={() => navigate('/checkout')}
        >Checkout</button>
      </div>
    </>
  )
}

export default Cart


