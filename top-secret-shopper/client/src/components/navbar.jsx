import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
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
      <p className='nav__welcome-text'>
        {user.username ? 'Welcome, ' + user.username : 'Let\'s Shop!'}
      </p>
      <span className='nav__links'>
        <Link to='/login' style={{ margin: '1em' }}>Login</Link>
        <Link to='/signup' style={{ margin: '1em' }}>Signup</Link>
        <Link to='/products' style={{ margin: '1em' }}>Products</Link>
      </span>
      
      {
        user.username ?
          <Link to="/products">All Products</Link> :
          <span className='nav__links'>
            <Link to='/login' style={{ margin: '1em' }}>Login</Link>
            <Link to='/signup' style={{ margin: '1em' }}>Signup</Link>
            <Link to='/products' style={{ margin: '1em' }}>Products</Link>
          </span>
      }
      
      {
        user.username ? (<button className='nav__logout-button' onClick={logout}>Logout</button>) : ''}
    </div >
  )
}

export default Navbar
