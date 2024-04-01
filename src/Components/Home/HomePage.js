import React, { Fragment } from 'react'
import Navbar from '../NavigationBar/Navbar'
import ContentPage from '../ContentDetailed/ContentPage'

function HomePage() {
  return (
    <Fragment>
        <Navbar/>
        <ContentPage/>
    </Fragment>
  )
}

export default HomePage