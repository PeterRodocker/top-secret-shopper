import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { Button, Form } from 'semantic-ui-react'

import './Login.css'
import { fetchCart } from '../utility/cartFuncs'

import CartContext from '../contexts/CartContext'
import UserContext from '../contexts/UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: token } = await axios.post('/auth/login', {
      username,
      password
    })
    window.localStorage.setItem('authorization', token)
    attemptTokenLogin()
    navigate('/products')
  }

  const attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('authorization')
    if (token) {
      const { data: user } = await axios.get('/auth/me', {
        headers: { authorization: token }
      })
      setUser(user)
      const cart = await fetchCart(token)
      setCart(cart)
    }
  }

  return (
    <div className='login__container'>
      <h1 className='login__heading'>Login</h1>
      <form className='login__form'>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          className='login_username'
        />
        <input
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          className='login_password'
        />
        <button
          type='submit'
          onClick={handleSubmit}
          className='button-submit'
        >
          Submit
        </button>
      </form>
    </div>
  )

}

export default Login

