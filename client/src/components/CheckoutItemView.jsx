import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import './CheckoutItemView.css'

import UserContext from '../contexts/UserContext';

const CheckoutItemView = ({ cartItem, type }) => {
  // let { id: productId, imageURL, name, price, cartProduct: { quantity } } = cartItem

  let { id: productId, imageURL, name, price, orderProduct: { quantity } } = cartItem

  console.log('quantity', quantity)

  const getSubtotal = () => {
    return quantity * price
  }

  return (
    <div className="checkout-item-view__container">
      <Link className='checkout-view_link' to={`/products/${productId}`}>
        <p className='checkout-view_heading'>{name}</p>
        <img className='checkout-view_image' src={imageURL} alt={name} />
      </Link>
      <div className="checkout-subtotal_container">
        <div className="middle-aligned-content">
          <p className='subtotal-text-title'>{`Quantity `}</p>
          <p className='subtotal-text-number'>{`${quantity}`}</p>
        </div>
        <div className="middle-aligned-content">
          <p className='subtotal-text-title'>{`Price `}</p>
          <p className='subtotal-text-number'>{`$${price}`}</p>
        </div>
        <div className="middle-aligned-content">
          <p className='subtotal-text-title'>{`Subtotal `}</p>
          <p className='subtotal-text-number'>{`$${getSubtotal()}`}</p>
        </div>
      </div>
    </div >
  )
}

export default CheckoutItemView