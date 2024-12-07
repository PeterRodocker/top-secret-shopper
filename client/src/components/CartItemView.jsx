import { useContext, useState } from "react"
import { Link } from "react-router-dom"

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
    <div className="cart-item-view_container">
      <Link className='cart-view_link' to={`/products/${productId}`}>
        <h3 className='cart-view_heading'>{name}</h3>
        <img className='cart-view_image' src={imageURL} alt={name} />
      </Link>
      <p id='price'>${price}</p>
      {stockQty - qty > 0 ?
        <p id="cart-in-stock">In Stock</p> :
        <p id="cart-only-in-stock">Only {qty} in Stock</p>
      }
      <form className='cart-view_form'>
        <div className="cart_label-input">
          <label htmlFor={`cart-view_input${productId}`} className="item-qty__label">Quantity: </label>
          <input
            onChange={handleChangeQty}
            type="number"
            value={qty < 1 ? 1 : Math.round(qty)}
            min="1"
            max={stockQty}
            id={`cart-view_input${productId}`}
            className="subtotal_input"
          >
          </input>
        </div>
        <button
          onClick={(e) => onUpdate(e, productId, qty, token)}
          type="submit"
          className='cart-view_update'>
          Update
        </button>
        <button
          onClick={(e) => onDelete(e, productId, token)}
          type="submit"
          className='cart-view_remove'>
          Remove
        </button>
      </form>
    </div >
  )
}

export default CartItemView