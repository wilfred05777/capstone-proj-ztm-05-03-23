import React, { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './routes/home/home.components'
import Navigation from './routes/navigation/navigation.component'
import Shop from './routes/shop/shop.component'
/**
 * Import the newly renamed Component from  SignIn to Authentication components
 * import SignIn from './routes/authentication/authentication.component'*/
import Authentication from './routes/authentication/authentication.component'
import Checkout from './routes/checkout/checkout.component'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        {/* index is matching the as the base component  */}
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='shop' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
        {/* 
          renaming the SignIn to Authentication Component
        <Route path='sign-in' element={<SignIn />} /> */}
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App
