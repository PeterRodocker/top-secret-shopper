<<<<<<< HEAD
import './productView.css'
=======

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Form, Input } from 'semantic-ui-react'
>>>>>>> 218848214d522afc7dbbf6dff9af49906d0efb8f

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
<<<<<<< HEAD
    <div className="product-view__container">
      <h3>{name}</h3>
      <img className='product-view__image' src={imageURL} alt={name} />
      <p>${price}</p>
      <p>{stockQty} in stock</p>
    </div>

=======
    <>
      <div style={{ margin: '5rem' }} className="product-view">
        <Link to={`/products/${id}`}>
          <h3>{name}</h3>
          <img style={{ maxWidth: '250px' }} src={imageURL} alt={name} />
        </Link>
        <p>${price}</p>
        {stockQty - qty > 0 ? <p>In Stock</p> : <p>Only {qty} in Stock</p>}
        <p>${description}</p>
        <Form>
          <Input onChange={handleChangeQty} type="number" value={qty < 1 ? 1 : qty} size="mini" min="1" max={stockQty}></Input>
          <button onClick={handleAddToCart} type="submit">Add to Cart</button>
          <button onClick={handleBuyNow} type="submit">Buy Now</button>
        </Form>
      </div >
    </>
>>>>>>> 218848214d522afc7dbbf6dff9af49906d0efb8f
  )
}

export default ProductView