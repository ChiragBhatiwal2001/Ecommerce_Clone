import axios from 'axios'
import '../NavigationBar/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import React, { Fragment, useState } from 'react'

function Navbar() {
  const [search, setSearch] = useState("")

  const navigate = useNavigate()


  return (
    <Fragment>
      <div className="app-navbar">

        <div className="app-logo"><li onClick={() => navigate("/")}>Home</li></div>
        <div className='search-bar'>

          <input type='text' placeholder='Search Here' value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => navigate(`/search/${search}`)}>Search</button>

        </div>
        <div className='nav-routing'>
          <ul>
            <li onClick={() => navigate("/cart")}>Cart</li>
            <li onClick={() => navigate("/add-product")}>Add Product</li>
            <li onClick={() => navigate("/signup")}>Register</li>
          </ul>



        </div>
      </div>
    </Fragment>
  )
}

export default Navbar