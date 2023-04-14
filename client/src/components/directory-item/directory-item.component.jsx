import React from 'react'

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer
} from './directory-item.styles'
import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({ category }) => {
  const { id, imageUrl, title, cta, route } = category
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>SHOP NOW!</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
