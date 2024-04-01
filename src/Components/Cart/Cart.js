import React,{Fragment, useEffect, useState} from 'react'
import "../Cart/Cart.css"
import {useNavigate} from "react-router-dom"
import Navbar from '../NavigationBar/Navbar'

function Cart() {
  const [cart,setCart] = useState([])

   const navigate = useNavigate()

  useEffect(()=>{
    fetch("/cart/findCartItem",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((response)=>response.json())
    .then((response)=>setCart(response.data))
    
  },[])
  return (
   <Fragment>
    <Navbar/>
    
      {
        cart.map((item)=>(
         
          <div className='cart' key={item.productId._id} onClick={()=>navigate(`/Item-details/${item.productId._id}`)}>
          <div className='image-cart'>
            <img src={item.productId.productImage} alt='image HEre'/>
          </div>
          <div className='content-display-cart'>
            <p>{item.productId.productName}</p>
            <p>{item.productId.productPrice}</p>
            <p>{item.productId.productShortDesc}</p>
          </div>
         </div>
        ))
       
      }
      
   </Fragment>
  )
}

export default Cart