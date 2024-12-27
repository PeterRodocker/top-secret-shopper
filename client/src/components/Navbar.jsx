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
    const keys = ['authorization', 'user', 'card', 'products', 'cart', 'checked', 'shippingAddress', 'billingAddress', 'selectedCard', 'dbCard', 'cvv'];

    setUser({})
    setCart({})
    keys.forEach(key => window.localStorage.removeItem(key));
    navigate('/login')
  }

  return (
    <div className='nav__container'>
      {!user.firstName ?
        <>
          <img className='black-logo' src={logo} alt="logo" />
          <p className='nav__welcome-text'>
            Welcome to Top Secret Shopper
          </p>
          <span className='nav__links'>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/signup'>Signup</Link>
            <Link className='link' to='/products'>Products</Link>
          </span>
        </>
        :
        <>
          <img className='black-logo' src={logo} alt="logo" />
          <p className='nav__welcome-text'>
            Welcome, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
          </p>
          <div>
            <Link to='/products' className='link'>Products</Link>
            <Link to='/account' className='link'>My Account</Link>
            <Link to='/checkout' className='link'>Checkout</Link>
            <Link to='/cart' className='link'>
              <button className='nav__cart-button'>
                {qty > 0 ? `Cart (${qty})` : 'Cart'}
              </button></Link>
            <button className='nav__logout-button' onClick={logout}>Logout</button>
          </div>
        </>
      }
    </div >
  )
}

export default Navbar
