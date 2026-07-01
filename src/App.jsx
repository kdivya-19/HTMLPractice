import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"  
import SingleProduct from "./components/SingleProduct/SingleProduct"
import Cart from "./components/Cart/Cart"
// import "./App.css"

function App() {

  const [cartLength, setCartLength]=useState(JSON.parse(localStorage.getItem("cartItems")) || [])
  

  return (
    <>
      
       
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home cartLength={cartLength.length} />} />
          <Route path='/login' element={<Login cartLen={cartLength}/>} />
          <Route path="/register" element={<Register />} />
          <Route path='/product/:id' element={<SingleProduct cartLen={cartLength}/>} />
          <Route path="/cart" element={<Cart cartLen={cartLength}/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
