import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import './SingleProduct.css'

function SingleProduct() {

    const {id}=useParams()

    const [sproduct, setProduct]=useState("")
    const [cartLength, setCartLength]=useState(JSON.parse(localStorage.getItem("cartItems")) || [])
    const user=JSON.parse(localStorage.getItem("userObj"))
     if(!user){
            return <Navigate to="/login" replace />;
        }

    const navigate=useNavigate()
    useEffect(  ()=>{

        const fetchData=async ()=>{

            let res=await fetch(`http://localhost:3000/products/${id}`)
            let data=await res.json()
            if(res.ok){
                console.log(data.title);
                
                setProduct(data)
                
                
                
            }
        }
        fetchData()
    },[id])

    const addCart=()=>{
        let cart=JSON.parse(localStorage.getItem("cartItems")) || []
        cart.push(sproduct)
        setCartLength(cart)
     
        localStorage.setItem("cartItems", JSON.stringify(cart))

        navigate("/cart")
    }

  return (
<>
    <div className="single-navbar">
        <Link to="/">
            <h2>Home</h2>
        </Link>

        <Link to="/cart">
            <h2>Cart ({cartLength.length})</h2>
        </Link>
    </div>

    <div className="product-container">

        <div className="image-section">
            <img src={sproduct.image} alt={sproduct.title} />
        </div>

        <div className="details-section">

            <p className="category">{sproduct.category}</p>

            <h1 className="title">{sproduct.title}</h1>

            <h2 className="price">${sproduct.price}</h2>

            <p className="description">
                {sproduct.description}
            </p>

            {sproduct.rating && (
                <p className="rating">
                    ⭐ {sproduct.rating.rate} ({sproduct.rating.count} Reviews)
                </p>
            )}

            <button
                className="cart-btn"
                onClick={addCart}
            >
                Add To Cart
            </button>

        </div>

    </div>
</>
);
}

export default SingleProduct
