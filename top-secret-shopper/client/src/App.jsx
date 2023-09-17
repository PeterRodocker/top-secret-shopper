import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import AllProducts from './components/allProducts'
import Navbar from './components/navbar'
import { UserProvider } from './contexts/UserContext';


function App() {
  return (
    <>
      <Router>
        <UserProvider storageKey='user'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/products' element={<AllProducts />} />
          </Routes>
        </UserProvider>
      </Router>
    </>

  )
}

export default App