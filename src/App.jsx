import React, { useState } from 'react'
import './App.css'
import './categories.styles.scss'

function App() {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      cta: 'Shop Now'
    },
    {
      id: 2,
      title: 'Jacket',
      cta: 'Shop Now'
    },

    {
      id: 3,
      title: 'Sneakers',
      cta: 'Shop Now'
    },
    {
      id: 4,
      title: 'Women',
      cta: 'Shop Now'
    },
    {
      id: 5,
      title: 'Men',
      cta: 'Shop Now'
    }
  ]

  return (
    <div className='categories-container'>
      {categories.map(({ id, title, cta }) => (
        <div key={id} className='category-container'>
          {/* <img /> */}
          <div className='background-image' />
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>{cta}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
