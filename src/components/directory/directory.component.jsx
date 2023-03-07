import React from 'react'

import './directory.styles.scss'

import CategoryItem from '../category-item/category-item.component'

const Directory = ({ categories }) => {
  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          categoryItemComponent={category}
          // category={category}
          // id={id}
          // cta={cta}
          // imageUrl={imageUrl}
        />
      ))}
    </div>
  )
}

export default Directory
