import { useContext, useEffect } from 'react';

import CartProductView from './CartProductView'

import CartContext from '../contexts/CartContext';


const Cart = () => {
  const [cart, setCart] = useContext(CartContext)

  const products = cart
  const handleDelete = async (productId) => {
    // products.filter(product => product.id !== )
    // const cart = await axios.put()
  }

  return (
    <>
      <h3 style={{ color: 'white' }}>Your Cart</h3>
      {products?.map(product => <CartProductView
        product={product}
        key={product.id}
        handleDelete={handleDelete}
      />)}
      <p style={{ color: 'white' }}>Subtotal ( Items): $</p>
    </>
  )
}

export default Cart


