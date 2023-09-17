import { useEffect, useState } from 'react';
import axios from 'axios'

import ProductView from './productView';

const AllProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const products = await axios.get('/api/products')
      setProducts(products.data)
    }
    fetchData()
  }, []);

  return (
    <>
      <h1>Products</h1>
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