import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { Button, Form, Input } from 'semantic-ui-react'
import './CartItemView.css'

import UserContext from '../contexts/UserContext';

const CartItemView = (props) => {
  const { onDelete, onUpdate, cartItem: { id: productId, imageURL, name, price, stockQty, cartDetail: { quantity } } } = props

  const [qty, setQty] = useState(quantity)
  const [user, setUser] = useContext(UserContext)
  const token = window.localStorage.getItem('authorization')

  const handleChangeQty = (e) => {
    if (e.target.value > stockQty) setQty(stockQty)
    else setQty(e.target.value)
  }

  return (
    <div className="cart-item-view__container">
      <Link className='product-view__link' to={`/products/${productId}`}>
        <h3 className='product-view__heading'>{name}</h3>
        <img className='product-view__image' src={imageURL} alt={name} />
      </Link>
      <p id='price'>${price}</p>
      {stockQty - qty > 0 ?
        <p id="in-stock">In Stock</p> :
        <p id="only-in-stock">Only {qty} in Stock</p>
      }
      <Form className='cart-view__form'>
        <input
          onChange={handleChangeQty}
          type="number"
          value={qty < 1 ? 1 : Math.round(qty)}
          min="1"
          max={stockQty}
          className="cart-view__input"
          id="cart-view__input"

        >
        </input>
        <button
          onClick={() => onUpdate(productId, qty, token)}
          type="submit"
          className='product-view__update'>
          Update
        </button>
        <button
          onClick={() => onDelete(productId, token)}
          type="submit"
          className='product-view__remove'>
          Remove
        </button>
      </Form>
    </div >
  )
}

export default CartItemView