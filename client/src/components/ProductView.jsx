import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import './ProductView.css'


const ProductView = (props) => {
  const { onAddToCart, onBuyNow, product: { description, id: productId, imageURL, name, price, stockQty } } = props
  const token = window.localStorage.getItem('authorization')

  const [qty, setQty] = useState(1)

  const handleChangeQty = (e) => {
    if (e.target.value > stockQty) setQty(stockQty)
    else setQty(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddToCart(productId, qty, token)
    setQty(1)
  }

  return (
    <div className="product-view__container">
      <Link className='product-view__link' to={`/products/${productId}`}>
        <h3 className='product-view__heading'>{name}</h3>
        <img className='product-view__image' src={imageURL} alt={name} />
      </Link>
      <p id='price'>${price}</p>
      {stockQty - qty > 0 ? <p id="product-in-stock">In Stock</p> : <p id="product-only-in-stock">Only {qty} in Stock</p>}
      <p className="product-view__description">${description}</p>
      <form className='product-view__form'>
        <input onChange={handleChangeQty}
          type="number"
          value={qty < 1 ? 1 : Math.round(qty)}
          size="mini"
          max={stockQty}
          id="product-view__input">
        </input>
        <button
          onClick={handleSubmit}
          type="submit"
          className='product-view__add-to-cart'>
          Add to Cart
        </button>
        <button
          onClick={(e) => onBuyNow(e, productId, qty, token)}
          type="submit"
          className='product-view__buy-now'>
          Buy Now
        </button>
      </form>
    </div >
  )
}

export default ProductView