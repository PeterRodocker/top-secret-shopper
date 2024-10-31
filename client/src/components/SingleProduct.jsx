import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { Button, Input, Form } from 'semantic-ui-react'


const SingleProduct = () => {
  const [product, setProduct] = useState([])
  const { productId } = useParams();
  const [qty, setQty] = useState(0)

  const { description, id, imageURL, name, price, stockQty } = product


  async function fetchData() {
    const product = await axios.get(`/api/products/${productId}`)
    setProduct(product.data)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleChange = (e) => {
    setQty(e.target.value)
  }

  const handleAddToCart = () => {
    console.log('AddToCart', qty)
  }

  const handleBuyNow = () => {
    console.log('BuyNow', qty)
  }

  return (
    <>
      <div className="single-product__container">
        <Link to={`/products/${productId}`}>
          <h3>{name}</h3>
          <img style={{ maxWidth: '250px' }} src={imageURL} alt={name} />
        </Link>
        <p>${price}</p>
        {stockQty - qty > 0 ?
          <p style={{ color: 'green' }}>In Stock</p> :
          <p style={{ color: 'orange' }}>Only {qty} in Stock</p>
        }
        <p>${description}</p>
        <Form>
          <Input onChange={handleChange} type="number" value={qty < 1 ? 1 : qty} size="mini" min="1" max={stockQty}></Input>
          <button onClick={handleAddToCart} type="submit">Add to Cart</button>
          <button onClick={handleBuyNow} type="submit">Buy Now</button>
        </Form>
      </div >
    </>
  )
}

export default SingleProduct