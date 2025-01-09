import { useState } from "react"
import { Link } from "react-router-dom"

import './ProductView.css'


const ProductView = (props) => {
  const { onAddToCart, product: { description, id: productId, imageURL, name, price, stockQty } } = props
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
    <div className="product-view_container">
      <Link className='product-view_link' to={`/products/${productId}`}>
        <h3 className='product-view_heading'>{name}</h3>
        <img className='product-view_image' src={imageURL} alt={name} />
      </Link>
      <p id='product-price'>${price}</p>
      {stockQty - qty > 0 ?
        <p id="product-in-stock">In Stock</p> :
        <p id="product-only-in-stock">Only {qty} in Stock</p>
      }
      <p className="product-view_description">${description}</p>
      <form className='product-view_form'>
        <input onChange={handleChangeQty}
          type="number"
          value={qty < 1 ? 1 : Math.round(qty)}
          size="mini"
          max={stockQty}
          id="product-view_input">
        </input>
        <button
          onClick={handleSubmit}
          type="submit"
          className='product-view_add-to-cart'>
          Add to Cart
        </button>
      </form>
    </div >
  )
}

export default ProductView