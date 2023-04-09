import React from 'react'

import './directory.styles.scss'

// import CategoryItem from '../category-item/category-item.component'
import DirectoryItem from '../directory-item/directory-item.component'

const categories = [
  {
    id: 1,
    title: 'hats',
    cta: 'Shop Now',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats'
  },
  {
    id: 2,
    title: 'jackets',
    cta: 'Shop Now',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets'
  },
  {
    id: 3,
    title: 'sneakers',
    cta: 'Shop Now',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers'
  },
  {
    id: 4,
    title: 'womens',
    cta: 'Shop Now',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens'
  },
  {
    id: 5,
    title: 'mens',
    cta: 'Shop Now',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens'
  }
]

// const Directory = ({ categories }) => {
const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory
