import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import AllProducts from './components/AllProducts'
import Navbar from './components/Navbar'
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