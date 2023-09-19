import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/login'
import Signup from './components/signup'
import AllProducts from './components/allProducts'
import SingleProduct from './components/singleProduct'
import Navbar from './components/navbar'
import './App.css'

import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <>
      <Router>
        <UserProvider storageKey="user">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
          </Routes>
        </UserProvider>
      </Router>
    </>

  )
}

export default App