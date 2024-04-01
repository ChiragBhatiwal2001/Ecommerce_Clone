import React, { Fragment, useEffect, useState } from 'react'
import "../ProductDetailedDescription/detailedDescription.css"
import Navbar from '../NavigationBar/Navbar'

import {useParams} from 'react-router-dom'

const DetailedDescription = () => {
  const {_id} = useParams()
  const [product,setProduct]=useState([])

  useEffect(()=>{
    fetch(`/product/find-single-product/${_id}`,{
      method:"POST",
     
      headers:{
        "Content-Type":"application/json"
      }

    }).then((response)=>response.json())
    .then((response)=>setProduct(response.data))
  },[])
   
  const addToCart=async (id)=>{
    console.log(id)
      await fetch(`/cart/addToCart/${id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
       }).then((response)=>response.json())
       .then((response)=>console.log(response))
       
  }

  return (
    <Fragment>
      <Navbar />
      <div className='parent-detailed'>
        <div className='image-detailed'>
          <img src={product.productImage} alt='image' />
        </div>

        <div className='content-detailed'>
          <div>
            <p>{product.productName}</p>
            <p>{product.productPrice}</p>
            <p>{product.productDesc}</p>
             
            <button onClick={()=>{addToCart(product._id)}}>AddToCart</button>
          </div>
        </div>
      </div>
    
    </Fragment>
  )
}

export default DetailedDescription;