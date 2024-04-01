import React, { Fragment } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './Components/SignUp/SignupPage';
import LoginPage from './Components/LoginPage/LoginPage';
import HomePage from './Components/Home/HomePage';
import AddProduct from './Components/AddProduct/AddProduct';
import DetailedDescription from './Components/ProductDetailedDescription/DetailedDescription';
import SearchFolder from './Components/SearchFolder/SearchFolder';
import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/Item-details/:_id" element={<DetailedDescription />} />
          <Route path='/search/:name' element={<SearchFolder/>}/>
          <Route  path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>

    </Fragment>
  );
}

export default App;
