import React, { Fragment, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../AddProduct/Addproduct.css"

import Navbar from '../NavigationBar/Navbar'

function AddProduct() {
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productStock, setProductStock] = useState("")
    const [productAbout, setProductAbout] = useState("")
    const [productImage, setProductImage] = useState("")
    const [productCategory,setProductCategory] = useState("")
    const [productSize,setProductSize] = useState("")
    

    const inputRef = useRef();

    const navigate = useNavigate()

    const AddProduct = async () => {

        const formData = new FormData();
        formData.append("productName", productName)
        formData.append("productPrice", productPrice)
        formData.append("productShortDesc", productStock)
        formData.append("productRichDesc", productAbout)
        formData.append("productImage", productImage)
        formData.append("productInStock",productStock)
        formData.append("productCategory",productCategory)
        formData.append("productSize",productSize)

        const url = "/product/add-product"
        axios.post(url, formData)
            .then(() => {

                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const handleImageClick = () => {
        inputRef.current.click();
    }
   
    const convertImage = async(e)=>{
        const image = URL.createObjectURL(e.target.files[0])
        setProductImage(image)
    }
    return (
        <Fragment>
            <Navbar />
            <div className='parent-container'>
            <div className='add-product-title'>
                <p>Add Product</p>
                <span>Add your product for customers</span>              
            </div>

            <div className='product-info'>
                 <div className='product-name'>
                    <div className='name-input'>
                    <label for="name">Product Name</label><br/>
                    <input type='text' id='name' value={productName} placeholder='Product Name' onChange={(e)=>setProductName(e.target.value)}/>
                    </div>
                    <div className='description-input'>
                    <label for="Description">Product Description</label><br/>
                    <textarea rows="3" id='Description' value={productAbout} placeholder='Description' onChange={(e)=>setProductAbout(e.target.value)} />
                    </div>
                 </div>

                 <div className='product-price-stock'>
                    <div className='product-price'>
                    <label for="price">Product-Price</label><br/>
                    <input id='price' placeholder='Price'value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/>
                    </div>
                    <div className='product-stock'>
                        <label for="stock">In-Stock</label><br/>
                        
                        <input id='stock' placeholder="In-Stock" onChange={(e)=>setProductStock(e.target.value)}/>
                    </div>
                 </div>
            </div>

            <div className='product-info-image'>
                <div className='product-image' >
                    <div className='image' onClick={handleImageClick} >
                    {
                        productImage?  <img src={productImage} alt="image"/>:<img src='' alt='image'/>
                    }
                    <input style={{display:"none"}} ref={inputRef} accept='image/*'  type='file' onChange={convertImage}/>
                    </div>
                </div>
                <div className='product-category'>
                    <div className='category'>
                    <label >Category</label><br/>
                     <select id='category' onChange={(e)=>setProductCategory(e.target.value)}>
                        <option value="Baby">Baby</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Books">Books</option>
                        <option value="Clothing & Accesories">Clothing & Accesories</option>
                        <option value="Cars & Motorbikes">Cars & Motorbikes</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Garden & Outdoors">Garden & Outdoors</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Toy">Toy</option>
                        <option value="Watches">Watches</option>
                        <option value="Health">Health</option>
                        <option value="Jwellery">Jwellery</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Luggage">Luggage</option>
                        <option value="Pet Supplies">Pet Supplies</option>
                        <option value="Music">Music</option>
                        <option value="Video Games">Video Games</option>
                        <option value="Tools">Tools</option>
                        <option value="Sports & Outdoors">Sports & Outdoors</option>
                       
                     </select>
                     </div>
                     <div className='product-Size'>
                    <label>Size</label>
                    <select onChange={(e)=>setProductSize(e.target.value)}>
                        <option value="none">None</option>
                        <option value="S" >S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>

                    </select>
                </div>
                </div>
                <button onClick={AddProduct}>Add Product</button>
            </div>
           
            </div>
        </Fragment>
    )
}
   
export default AddProduct