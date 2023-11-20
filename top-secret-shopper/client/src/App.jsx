import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Account from './components/Account'
import AllProducts from './components/AllProducts'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import SingleProduct from './components/singleProduct'
import './App.css'

import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { ProductProvider } from './contexts/ProductContext';


function App() {
  return (
    <>
      <Router>
        <UserProvider storageKey="user">
          <CartProvider storageKey="cart">
            <ProductProvider storageKey="products">
              <Navbar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/products/:productId" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </Router>
    </>
  )
}

export default App