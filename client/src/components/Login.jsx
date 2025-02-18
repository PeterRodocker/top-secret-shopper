import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Login.css'
import { fetchCart } from '../utility/cartFuncs'
import { fetchUser } from '../utility/userFuncs';

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
    await attemptTokenLogin()
    const cart = await fetchCart(token)
    setCart(cart)
    navigate('/products')
  }

  const attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('authorization')
    if (token) {
      const user = await fetchUser(token)
      setUser(user)
    }
  }

  return (
    <div className='login_container'>
      <h1 className='login_heading'>Login</h1>
      <form className='login_form'>
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
          className='login_button-submit'
        >
          Submit
        </button>
      </form>
    </div>
  )

}

export default Login

