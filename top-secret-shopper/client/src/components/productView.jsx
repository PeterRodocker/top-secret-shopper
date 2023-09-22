import { useState } from "react"
import { Link } from "react-router-dom"

import { Button, Form, Input } from 'semantic-ui-react'
import './ProductView.css'

const ProductView = (props) => {
  const { product: { description, id, imageURL, name, price, stockQty } } = props
  const [qty, setQty] = useState(0)
  let qtyInStock = stockQty

  const handleChangeQty = (e) => {
    setQty(e.target.value)
  }

  const handleAddToCart = () => {
    console.log('AddToCart', qty)
  }

  const handleBuyNow = () => {
    console.log('BuyNow', qty)
  }

  return (
    <div className="product-view__container">
      <Link to={`/products/${id}`}>
        <h3>{name}</h3>
        <img className='product-view__image' src={imageURL} alt={name} />
      </Link>
      <p>${price}</p>
      {stockQty - qty > 0 ? <p id="in-stock">In Stock</p> : <p id="only-in-stock">Only {qty} in Stock</p>}
      <p id="description">${description}</p>
      <Form>
        <Input onChange={handleChangeQty} type="number" value={qty < 1 ? 1 : qty} size="mini" min="1" max={stockQty}></Input>
        <button onClick={handleAddToCart} type="submit">Add to Cart</button>
        <button onClick={handleBuyNow} type="submit">Buy Now</button>
      </Form>
    </div >
  )
}

export default ProductView