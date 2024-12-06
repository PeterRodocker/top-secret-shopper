import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import './CheckoutItemView.css'

import UserContext from '../contexts/UserContext';

const CheckoutItemView = (props) => {
  const { cartItem: { id: productId, imageURL, name, price, cartDetail: { quantity } } } = props

  const getSubtotal = () => {
    return quantity * price
  }

  return (
    <div className="checkout-item-view__container">
      <Link className='checkout-view__link' to={`/products/${productId}`}>
        <h3 className='checkout-view__heading'>{name}</h3>
        <img className='checkout-view__image' src={imageURL} alt={name} />
      </Link>

      <div className="checkout-subtotal__container">
        <div className="middle-aligned-content">
          <p className='subtotal-text-title'>{`Quantity: `}</p>
          <p className='subtotal-text-number'>{`${quantity}`}</p>
        </div>
        <div className="middle-aligned-content">
          <p className='subtotal-text-title'>{`Price: `}</p>
          <p className='subtotal-text-number'>{`$${price}`}</p>
        </div>
        <div className="middle-aligned-content">
          <p className='subtotal-text-title'>{`Item Subtotal: `}</p>
          <p className='subtotal-text-number'>{`$${getSubtotal()}`}</p>
        </div>
      </div>
    </div >
  )
}

export default CheckoutItemView