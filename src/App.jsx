import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './routes/home/home.components'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Home /> */}
    </Routes>
    // <Directory categories={categories} />
  )
}

export default App
