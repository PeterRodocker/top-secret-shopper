import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
      <p style={{ margin: '1em', fontWeight: 'bold' }}>{user.username ? 'Welcome, ' + user.username : 'Let\'s Shop!'}</p>
      {user && user.username ?
        <Link to="/products" style={{ margin: '1em' }}>All Products</Link>
        :
        <span style={{ display: 'flex', flexDirection: 'row' }}>
          <Link to="/login" style={{ margin: '1em' }}>Login</Link>
          <Link to="/signup" style={{ margin: '1em' }}>Signup</Link>
          <Link to="/products" style={{ margin: '1em' }}>Products</Link>
        </span>
      }

      {user.username ? (
        <button style={{
          backgroundColor: 'dodgerblue',
          borderRadius: 5,
          color: 'white',
          border: 'none',
          padding: 12,
          margin: 5,
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: 16,
        }}
          onClick={logout}
        >Logout</button>
      ) : ''}
    </div >
  )
}

export default Navbar
