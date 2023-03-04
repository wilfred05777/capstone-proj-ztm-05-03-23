import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>{cta}</p>
          </div>
        </div>
      ))}
      {/* <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Hats</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Jackets</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Sneakers</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Womens</h2>
          <p>Shop Now</p>
        </div>
      </div>
      <div className='category-container'>
        <img />
        <div className='category-body-container'>
          <h2>Mens</h2>
          <p>Shop Now</p>
        </div>
      </div> */}
    </div>
  )
}

export default App
