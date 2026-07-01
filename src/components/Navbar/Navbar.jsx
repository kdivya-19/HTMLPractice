import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "./navbar.css"

function Navbar({setCategory, setValue}) {

   const [cartLength, setcartLength]=useState(JSON.parse(localStorage.getItem("cartItems")) || [])
    const user = JSON.parse(localStorage.getItem("userObj"));

    const handleCategory=async (e)=>{
        setCategory(e.target.textContent.toLowerCase())
        console.log(e.target.textContent.toLowerCase())
    }

    const hadleSearch=(e)=>{
        setValue(e.target.value)
        console.log(e.target.value);
        
    }

    const navigate=useNavigate()

  return (

    <div className='navbar'>
        <div className="categories">
            <ul type="none">
                <li onClick={() => setCategory("all")}>
                   All
                </li>
                <li onClick={handleCategory}>Mens Wear</li>
                <li onClick={handleCategory}>Womens Wear</li>
                <li onClick={handleCategory}>Kids Wear</li>
                <li onClick={handleCategory}>Footwear</li>
            </ul>
        </div>
        <div className="search">
            <input onChange={hadleSearch} type="search" placeholder='Search for products...' />
            <p><NavLink to={user ? "/cart" : "/login"}> Cart({cartLength.length}) </NavLink></p>
            <button onClick={()=>{
                navigate("/login")
            }} >Login</button>
        </div>
    </div>
  )
}

export default Navbar
