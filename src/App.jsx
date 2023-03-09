import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './routes/home/home.components'

const Shop = () => {
  return <h1>I am the shop page</h1>
}

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />}>
        <Route path='shop' element={<Shop />} />
        {/* /home/shop */}
      </Route>
      {/* code above - it is No longer a sibling but nested element -> Parent level add a <Outlet/> to render the nested which is /shop, because it will only render the parent level element. */}

      {/* <Route path='/' element={<Home />} /> */}
      {/* <Route path='/shop' element={<Shop />} /> */}
    </Routes>
  )
}

export default App
