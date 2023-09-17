import { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../contexts/UserContext'


const Navbar = () => {
  const [user, setUser] = useContext(UserContext)

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('Authorization')
    window.localStorage.removeItem('user')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
      <p style={{ margin: '1em', fontWeight: 'bold' }}>{user.username ? 'Welcome, ' + user.username : 'Let\'s Shop!'}</p>
      <span style={{ display: 'flex', flexDirection: 'row' }}>
        <Link to='/login' style={{ margin: '1em' }}>Login</Link>
        <Link to='/signup' style={{ margin: '1em' }}>Signup</Link>
        <Link to='/products' style={{ margin: '1em' }}>Products</Link>
      </span>
      {user ? (
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
