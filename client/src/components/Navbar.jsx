import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/black-logo-large.png'

import './Navbar.css'

import CartContext from '../contexts/CartContext'
import UserContext from '../contexts/UserContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  const [qty, setQty] = useState(0)

  useEffect(() => {
    getQty()
  }, [qty, cart]);

  const getQty = () => {
    let quantity = 0;

    if (cart.length) {
      cart.forEach(cartItem => quantity += cartItem.cartProduct.quantity)
    }
    setQty(quantity)
  }

  const logout = () => {
    const keys = ['authorization', 'user', 'card', 'products', 'cart', 'checked', 'shippingAddress', 'billingAddress', 'selectedCard', 'verifiedCard', 'cvv'];

    setUser({})
    setCart({})
    keys.forEach(key => window.localStorage.removeItem(key));
    navigate('/login')
  }

  return (
    <div className='nav_container'>
      {!user.firstName ?
        <>
          <img className='black-logo' src={logo} alt="logo" />
          <p className='nav_welcome-text'>
            Welcome to Top Secret Shopper
          </p>
          <span className='nav_links'>
            <Link className='nav_link' to='/login'>Login</Link>
            <Link className='nav_link' to='/signup'>Signup</Link>
            <Link className='nav_link' to='/products'>Products</Link>
          </span>
        </>
        :
        <>
          <img className='black-logo' src={logo} alt="logo" />
          <p className='nav_welcome-text'>
            Welcome, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
          </p>
          <div>
            <Link to='/products' className='nav_link'>Products</Link>
            <Link to='/account' className='nav_link'>My Account</Link>
            <Link to='/checkout' className='nav_link'>Checkout</Link>
            <Link to='/cart' className='link'>
              <button className='nav_cart-button'>
                {qty > 0 ? `Cart (${qty})` : 'Cart'}
              </button></Link>
            <button className='nav_logout-button' onClick={logout}>Logout</button>
          </div>
        </>
      }
    </div >
  )
}

export default Navbar
