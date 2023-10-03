import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AllProducts from './components/AllProducts'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import SingleProduct from './components/singleProduct'
import './App.css'

import { UserProvider } from './contexts/UserContext';
import { ProductProvider } from './contexts/ProductContext';


function App() {
  return (
    <>
      <Router>
        <UserProvider storageKey="user">
          <ProductProvider storageKey="products">
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:productId" element={<SingleProduct />} />
            </Routes>
          </ProductProvider>
        </UserProvider>
      </Router>
    </>
  )
}

export default App