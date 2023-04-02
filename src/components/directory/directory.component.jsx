import React from 'react'

import './directory.styles.scss'

// import CategoryItem from '../category-item/category-item.component'
import DirectoryItem from '../category-item-rename-to-directory-item/category-item.component'

const Directory = ({ categories }) => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          categoryItemComponent={category}
          // category={category}
          // id={id}
          // cta={cta}
          // imageUrl={imageUrl}
        />
      ))}
    </div>
    // <div className='categories-container'>
    //   {categories.map((category) => (
    //     <CategoryItem
    //       key={category.id}
    //       categoryItemComponent={category}
    //       // category={category}
    //       // id={id}
    //       // cta={cta}
    //       // imageUrl={imageUrl}
    //     />
    //   ))}
    // </div>
  )
}

export default Directory
