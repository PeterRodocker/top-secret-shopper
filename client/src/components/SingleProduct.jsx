import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

import { addToCart } from '../utility/cartFuncs';
import "./SingleProduct.css"

import CartContext from '../contexts/CartContext';

const SingleProduct = () => {
  const [cart, setCart] = useContext(CartContext)
  const [product, setProduct] = useState([])
  const { productId } = useParams()
  const [qty, setQty] = useState(1)
  const token = window.localStorage.getItem('authorization')

  const { description, imageURL, name, price, stockQty } = product


  async function fetchData() {
    const product = await axios.get(`/api/products/${productId}`)
    setProduct(product.data)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleChange = (e) => {
    if (e.target.value > stockQty) setQty(stockQty)
    else setQty(e.target.value)
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()
    const updatedCart = await addToCart(productId, qty, token)
    setCart(updatedCart)
    setQty(1)
  }

  return (
    <div className="single-product_container">
      <h1 className='single-product_heading'>{name}</h1>
      <img src={imageURL} alt={name} className="single-product__image" />
      <p className="single-product__description">${description}</p>
      <p className="single-product__price">${price}</p>
      {stockQty - qty > 0 ?
        <p className="single-product__in-stock">In Stock</p> :
        <p className="single-product__only-in-stock">Only {qty} in Stock</p>
      }
      <form className="single-product__form">
        <input
          onChange={handleChange}
          type="number"
          value={qty < 1 ? 1 : qty}
          max={stockQty}
          id="single-product__input"
        >
        </input>
        <button
          onClick={handleAddToCart}
          type="submit"
          className="single-product__add-to-cart"
        >
          Add to Cart
        </button>
      </form>
    </div>
  )
}

export default SingleProduct