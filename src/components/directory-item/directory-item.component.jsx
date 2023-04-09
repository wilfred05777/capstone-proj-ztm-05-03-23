import React from 'react'
// import './directory-item.styles.scss'
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer
} from './directory-item.styles'

const DirectoryItem = ({ category }) => {
  const { id, imageUrl, title, cta } = category

  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>SHOP NOW!</p>
      </Body>
    </DirectoryItemContainer>

    // <div className='directory-item-container'>
    //   <div
    //     className='background-image'
    //     style={{
    //       backgroundImage: `url(${imageUrl})`
    //     }}
    //   />
    //   <div className='body'>
    //     <h2>{title}</h2>
    //     <p>SHOP NOW!</p>
    //     {/* <p>{cta}</p> */}
    //   </div>
    // </div>
  )
}

export default DirectoryItem
