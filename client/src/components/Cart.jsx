import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import CartItemView from './CartItemView'
import { deleteFromCart, fetchCart, updateCart } from '../utility/cartFuncs';
import './Cart.css'

import CartContext from '../contexts/CartContext';

const Cart = () => {
  const [cart, setCart] = useContext(CartContext)
  const navigate = useNavigate()

  const getSubtotal = () => {
    let subtotal = 0
    cart.length ? cart.map(cartItem => {
      subtotal += (cartItem.cartDetail.quantity * cartItem.price)
    }) : ""
    return subtotal
  }

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
      <div className='cart__items-container'>
        {cart.length ? cart.map(cartItem => <CartItemView
          cartItem={cartItem}
          key={cartItem.id}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />) :
          <h3 className='no-items'>No items in your cart</h3>}
      </div>
      <div className='subtotal-div'>
        <h2>Order Subtotal: ${getSubtotal()} </h2>
        <button
          className='cart__checkout-button'
          onClick={() => navigate('/checkout')}
        >Checkout</button>
      </div>
    </>
  )
}

export default Cart


