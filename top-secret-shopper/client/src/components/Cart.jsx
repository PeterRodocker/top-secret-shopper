import { useContext } from 'react';
import axios from 'axios'

import CartItemView from './CartItemView'
import { deleteFromCart, fetchCart, updateCart } from '../utility/cartFuncs';

import CartContext from '../contexts/CartContext';

const Cart = () => {
  const [cart, setCart] = useContext(CartContext)

  const handleUpdate = async (userId, productId, quantity, token) => {
    const updatedCart = await updateCart(userId, productId, quantity, token)
    setCart(updatedCart)
  }

  const handleDelete = async (userId, productId, token) => {
    deleteFromCart(userId, productId, token)
    const cart = await fetchCart(userId, token)
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
      <p style={{ color: 'white' }}>Subtotal: $</p>
    </>
  )
}

export default Cart


