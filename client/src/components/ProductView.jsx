import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { Button, Form, Input } from 'semantic-ui-react'
import './ProductView.css'

import UserContext from '../contexts/UserContext';

const ProductView = (props) => {
  const { onAddToCart, onBuyNow, product: { description, id: productId, imageURL, name, price, stockQty } } = props

  const [qty, setQty] = useState(1)
  const [user, setUser] = useContext(UserContext)
  const token = window.localStorage.getItem('authorization')


  const handleChangeQty = (e) => {
    if (e.target.value > stockQty) setQty(stockQty)
    else setQty(e.target.value)
  }


  return (
    <div className="product-view__container">
      <Link className='product-view__link' to={`/products/${productId}`}>
        <h3 className='product-view__heading'>{name}</h3>
        <img className='product-view__image' src={imageURL} alt={name} />
      </Link>
      <p id='price'>${price}</p>
      {stockQty - qty > 0 ? <p id="in-stock">In Stock</p> : <p id="only-in-stock">Only {qty} in Stock</p>}
      <p className="product-view__description">${description}</p>
      <Form className='product-view__form'>
        <input onChange={handleChangeQty}
          type="number"
          value={qty < 1 ? 1 : Math.round(qty)}
          size="mini"
          max={stockQty}
          id="product-view__input">
        </input>
        <button
          onClick={() => onAddToCart(productId, qty, token)}
          type="submit"
          className='product-view__add-to-cart'>
          Add to Cart
        </button>
        <button
          onClick={() => onBuyNow(productId, qty, token)}
          type="submit"
          className='product-view__buy-now'>
          Buy Now
        </button>
      </Form>
    </div >
  )
}

export default ProductView