import React from 'react'
import './category-item.styles.scss'

const CategoryItem = ({ categoryItemComponent }) => {
  const { id, imageUrl, title, cta } = categoryItemComponent
  // const CategoryItem = ({ category }) => {
  //   const { id, imageUrl, title, cta } = category

  return (
    <div className='category-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>SHOP NOW!</p>
        {/* <p>{cta}</p> */}
      </div>
    </div>
  )
}

export default CategoryItem
