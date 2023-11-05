import { useContext } from 'react';
import axios from 'axios'

import CartItemView from './CartItemView'
import { deleteFromCart, fetchCart, updateCart } from '../utility/cartFuncs';

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
      <h3 style={{ color: 'white' }}>Your Cart</h3>
      {cart.length ? cart.map(cartItem => <CartItemView
        cartItem={cartItem}
        key={cartItem.id}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />) :
        <p style={{ color: 'white' }}>No items in your cart</p>}
      <p style={{ color: 'white' }}>Subtotal: ${getSubtotal()}</p>
    </>
  )
}

export default Cart


