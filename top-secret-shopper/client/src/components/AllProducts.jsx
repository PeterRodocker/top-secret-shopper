import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductView from './ProductView';
import ProductContext from '../contexts/ProductContext';


const AllProducts = () => {
  const [products, setProducts] = useContext(ProductContext)

  async function fetchProducts() {
    try {
      const { data: products } = await axios.get('/api/products')
      setProducts(products)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <>
      <h1>All Products</h1>
      <div className='all-products-container'>
        {products.length ? products.map(product => (
          <div key={product.id}>
            <ProductView product={product} />
          </div>
        )) : ''
        }
      </div>
    </>
  )
}

export default AllProducts