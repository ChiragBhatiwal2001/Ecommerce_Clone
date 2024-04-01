import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ContentDetailed/ContentPage.css'

function ContentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/product/find-product", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((response) => setData(response.data))
  },[])
 

  return (
    <Fragment>
      <div className='parent-div'>     
         
           {
          data.map((item) => 
            <div className='content' key={item._id} onClick={() => navigate(`/Item-details/$item._id`)} >
            <img className='img-content' src={item.productImage} alt='image'/>
            <p className='price-content'>{item.productPrice}</p>
            <p className='name-content'>{item.productName}</p>
            </div>
           )} 
        
           
          
      </div>
     
     
     
        


     
    </Fragment>
  )
}

export default ContentPage