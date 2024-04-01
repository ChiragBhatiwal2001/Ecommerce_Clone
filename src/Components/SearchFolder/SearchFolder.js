import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "../SearchFolder/searchFolder.css"
import Navbar from '../NavigationBar/Navbar'


function SearchFolder() {
    const [productData, setProductData] = useState([])
    const { name } = useParams()
    console.log(name)
    const navigate = useNavigate()
    const searchedData = async () => {
        await fetch(`/product/search-Product/${name}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => response.json())
            .then((response) => setProductData(response.data))

    }
    useEffect(() => {
        searchedData()
    }, [])
    return (
        <Fragment>
            <Navbar />

            {productData.map((item) =>

                <div className='search-parent' key={item._id} onClick={()=>navigate(`/Item-details/${item._id}`)}>
                    <div className='card-image'>
                        <img src={item.productImage} alt='image' />

                    </div>
                    <div className='card-content'>
                        <p>{item.productName}</p>
                    </div>
                </div>
            )
            }


        </Fragment >
    )
}

export default SearchFolder