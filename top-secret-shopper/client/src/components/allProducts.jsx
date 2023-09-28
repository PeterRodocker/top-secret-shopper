import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import ProductView from './ProductView';

const AllProducts = () => {
  const [products, setProducts] = useState([])

  async function fetchData() {
    const products = await axios.get('/api/products')
    setProducts(products.data)
  }
<<<<<<< HEAD
<<<<<<< HEAD
  
=======

>>>>>>> 218848214d522afc7dbbf6dff9af49906d0efb8f
=======

>>>>>>> f18be0d85768f2b7160825aff7776596ad2f17a0
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <h1>All Products</h1>
      <div className='all-products-container'>
        {products.map(product => (
          <div key={product.id}>
            <ProductView product={product} />
          </div>
        ))}
      </div>
    </>
  )
}

export default AllProducts