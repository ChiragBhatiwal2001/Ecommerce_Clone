import React, { Fragment, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import "../LoginPage/LoginPage.css"
import Navbar from '../NavigationBar/Navbar'


function LoginPage() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("") 
 
    const navigate = useNavigate()   

    const Login = async () => {
        const url = "/api/login-user"
        axios.post(url,({username,password}),{withCredentials: 'true'})
        .then((data)=>{
             console.log("Logged IN",data)
             
             navigate('/')
        })
        .catch((err)=>{
            console.log("Can't fetch user",err)
            navigate('/login-page')
        })
      
    }

  return (
    <Fragment>
      <Navbar/>
         <div className='login-form'>
                <input className='login-username' type='text' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                           
                <input className='login-password' type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />

                <button className='login-button' onClick={Login}>Submit</button><br />
                <Link className='login-link' to="/signup" >Signup</Link>
            </div>
    </Fragment>
  )
}

export default LoginPage