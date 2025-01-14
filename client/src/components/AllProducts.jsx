import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import ProductView from './ProductView';
import { addToCart, updateCart } from '../utility/cartFuncs';
import './AllProducts.css';

import CartContext from '../contexts/CartContext';
import ProductContext from '../contexts/ProductContext';


const AllProducts = () => {
  const [cart, setCart] = useContext(CartContext)
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

  const handleAddToCart = async (productId, quantity, token) => {
    const updatedCart = await addToCart(productId, quantity, token)
    setCart(updatedCart)
  }

  return (
    <div className='all-products_container'>
      <h1 className='account_heading'>Products</h1>
      <div className='all-products-content_container'>
        {products.length && products.map(product => (
          <ProductView
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default AllProducts