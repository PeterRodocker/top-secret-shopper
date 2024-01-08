import { useContext, useEffect, useState } from 'react'

import CartContext from '../contexts/CartContext';
import UserContext from '../contexts/UserContext';

const Checkout = () => {
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)

  return (
    <div>
      Checkout
    </div>
  )
}

export default Checkout
