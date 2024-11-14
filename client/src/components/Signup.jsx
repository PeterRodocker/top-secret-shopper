import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Signup.css'
import { createNewCart, fetchCart } from '../utility/cartFuncs'

import CartContext from '../contexts/CartContext'
import UserContext from '../contexts/UserContext'

const Signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: { token } } = await axios.post('/auth/signup', {
      firstName,
      lastName,
      username,
      email,
      password
    })
    window.localStorage.setItem('authorization', token);
    attemptTokenLogin()
    createNewCart(token)
    const cart = await fetchCart(token)
    setCart(cart)
    navigate('/products')
  }

  const attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('authorization')
    if (token) {
      const { data: user } = await axios.get('./auth/me', {
        headers: { authorization: token }
      })
      setUser(user);
    }
  }

  return (
    <div className='signup__container'>
      <h1 className='signup__heading'>Signup</h1>
      <form className='signup__form'>
        <input
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          className="signup__firstname"
        />
        <input
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          className="signup__lastname"
        />
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          className="signup__username"
        />
        <input
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          className="signup__email"
        />
        <input
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          className="signup__password"
        />
        <button
          type='submit'
          onClick={handleSubmit}
          className='signup__button-submit'
        >
          Submit
        </button>
      </form>
    </div>
  )

}

export default Signup

