import { useState } from "react"
import { Link } from "react-router-dom"

import { Button, Form, Input } from 'semantic-ui-react'
import './ProductView.css'

const ProductView = (props) => {
  const { handleDelete, product: { id, imageURL, name, price, stockQty, cartDetail: { quantity } } } = props

  const [qty, setQty] = useState(quantity)

  const handleChangeQty = (e) => {
    setQty(e.target.value)

  }

  return (
    <div className="product-view__container">
      <Link className='product-view__link' to={`/products/${id}`}>
        <h3 className='product-view__heading'>{name}</h3>
        <img className='product-view__image' src={imageURL} alt={name} />
      </Link>
      <p id='price'>${price}</p>
      {stockQty - qty > 0 ?
        <p id="in-stock">In Stock</p> :
        <p id="only-in-stock">Only {qty} in Stock</p>
      }
      <Form className='product-view__form'>
        <Input
          onChange={handleChangeQty}
          type="number"
          value={qty < 1 ? 1 : qty}
          size="mini" min="1"
          max={stockQty}
        >
        </Input>
        <button
          onClick={handleDelete}
          type="submit"
          className='product-view__delete'>
          Delete
        </button>
      </Form>
    </div >
  )
}

export default ProductView