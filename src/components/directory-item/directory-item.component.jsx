import React from 'react'
import './directory-item.styles.scss'

const DirectoryItem = ({ categoryItemComponent }) => {
  const { id, imageUrl, title, cta } = categoryItemComponent
  // const CategoryItem = ({ category }) => {
  //   const { id, imageUrl, title, cta } = category

  return (
    <div className='directory-item-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='body'>
        <h2>{title}</h2>
        <p>SHOP NOW!</p>
        {/* <p>{cta}</p> */}
      </div>
    </div>
  )
}

export default DirectoryItem
