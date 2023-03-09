// @ts-nocheck
import React, { useState } from 'react'
import './App.css'
// import './categories.styles.scss' - deleted due to refactoring
// import CategoryItem from './components/category-item/category-item.component'
import Directory from './components/directory/directory.component'

function App() {
  const categories = [
    {
      id: 1,
      title: 'hats',
      cta: 'Shop Now',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png'
    },
    {
      id: 2,
      title: 'jackets',
      cta: 'Shop Now',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png'
    },
    {
      id: 3,
      title: 'sneakers',
      cta: 'Shop Now',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png'
    },
    {
      id: 4,
      title: 'womens',
      cta: 'Shop Now',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    },
    {
      id: 5,
      title: 'mens',
      cta: 'Shop Now',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
    }
  ]

  return (
    <Directory categories={categories} />
    // <div className='categories-container'>
    //   {categories.map((category) => (
    //     <CategoryItem
    //       key={category.id}
    //       categoryItemComponent={category}
    //       // id={id}
    //       // cta={cta}
    //       // imageUrl={imageUrl}
    //     />
    //   ))}
    // </div>
  )
}

export default App
