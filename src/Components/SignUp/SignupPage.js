import React from 'react'
import './signup.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import Navbar from '../NavigationBar/Navbar';
export default function SignupPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const SignUp = async () => {
        console.log(name, password, email);
        let result = await fetch('http://localhost:5000/signup', {
            method: "POST",
            body: JSON.stringify({ name, password, email }),
            headers: {
                'content-type': 'application/json',
            },
        });
        result = await result.json();
        console.log(await result);
    }
    return (
        <>
          <div  className='Signup'>
            <Navbar/>
            <img src='' alt='Company Image' /><br />

            <div className='div_input_style'>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' /><br />
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' /><br />
            <input type='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' /><br />
            </div>

            <button type='submit' onClick={SignUp}>SignUp</button><br/>

            <Link to={'/login-page'} >LoginPage</Link>
            </div> 
        </>
    )
}
