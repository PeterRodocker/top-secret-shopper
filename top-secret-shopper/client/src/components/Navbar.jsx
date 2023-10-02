import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'

import UserContext from '../contexts/UserContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('Authorization')
    window.localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className='nav__container'>
      {!user.username ?
        <>
          <p className='nav__welcome-text'>
            Sign In To Give Us $$$
          </p>
          <span className='nav__links'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
            <Link to='/products'>Products</Link>
          </span>
        </>
        :
        <>
          <p className='nav__welcome-text'>
            Welcome, {user.username}
          </p>
          <Link to='/products' style={{ margin: '1em' }}>Products</Link>
          <button className='nav__logout-button' onClick={logout}>Logout</button>
        </>
      }
    </div >
  )
}

export default Navbar
