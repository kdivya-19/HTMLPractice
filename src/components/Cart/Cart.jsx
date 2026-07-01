import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Cart.css"


function Cart() {
    const [items, setItems] = useState([]);
    const user=JSON.parse(localStorage.getItem("userObj"))
     if(!user){
            return <Navigate to="/login" replace />;
        }
    
    useEffect(() => {
       
        const data = JSON.parse(localStorage.getItem("cartItems")) || [];
        console.log(data.length);
        setItems(data);
        
    },[]);

     useEffect(() => {
        console.log(items.length);
    }, [items]);

    const delItems=(id1)=>{
       console.log(id1);
       const updatedItems=items.filter(it=>it.id!=id1)
       setItems(updatedItems)
       console.log("length= ", updatedItems.length);
       localStorage.setItem("cartItems", JSON.stringify(updatedItems))
        
    }

    return (
<div>

    <div className="cart-navbar">
        <Link to="/">
            <h2>Home</h2>
        </Link>

        <h2>Cart ({items.length})</h2>
    </div>

    <div className="cart-container">

        {items.length > 0 ? (

            items.map(item => (

                <div className="item" key={item.id}>

                    <img src={item.image} alt={item.title} />

                    <p className="item-title">
                        {item.title}
                    </p>

                    <p className="item-price">
                        ₹ {item.price}
                    </p>

                    <button
                        className="delete-btn"
                        onClick={() => delItems(item.id)}
                    >
                        Delete
                    </button>

                </div>

            ))

        ) : (

            <p className="empty-cart">
                Your Cart is Empty 🛒
            </p>

        )}

    </div>

</div>
);
   
}

export default Cart;