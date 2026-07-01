import React, { useEffect, useState } from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Home({cartLength}) {
  

  const [allProducts, setAllproducts]=useState([])
  const [category, setCategory]=useState("all")
  const [svalue, setValue]=useState("")
  const user = JSON.parse(localStorage.getItem("userObj"));

   
  // const [filteredData, setFilteredData]=useState(allProducts)
  useEffect(()=>{
    const displyDetails=async ()=>{
      let res=await fetch("http://localhost:3000/products")
      let data=await res.json()
      if(res.ok){
        setAllproducts(data)
      }
      console.log("user= ", user);
      

    }
    // console.log(category, svalue);
    
    displyDetails()
  },[])

  
  const filteredData= 
  svalue=="" ? (category=="all"?allProducts:allProducts.filter(i=>i.category.toLowerCase()==category.toLowerCase())): allProducts.filter(
    i=>i.title.toLowerCase().includes(svalue.toLowerCase())
  )


    const navigate=useNavigate()

  return(
    <div>
      <Navbar setCategory={setCategory} setValue={setValue} cartLength={cartLength}   />
      <div className='products'>
        {

          filteredData.map(it=>{
          return <div className='product' key={it.id} onClick={()=>{user ? navigate("/product/"+it.id): navigate("/login") }}>
              <img src={it.image} style={{width:"100px", height:"100px"}} />
              <h3>{it.title}</h3>
              <p>Rs. {it.price}</p>
            </div>

          })
        }
        </div>
      </div>
  )
}
  
export default Home