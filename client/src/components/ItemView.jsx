import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import './ItemView.css'

import UserContext from '../contexts/UserContext';

const ItemView = ({ cartItem }) => {
  const { id: productId, imageURL, name, price, cartProduct, orderProduct } = cartItem

  let quantity
  if (cartProduct) quantity = cartProduct.quantity
  if (orderProduct) quantity = orderProduct.quantity

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

export default ItemView