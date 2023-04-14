import React, { useContext } from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon-styles.jsx'

import { CartIconContainer, ItemCount } from './cart-icon-styles'

import { CartContext } from '../../contexts/cart.context'

const CartIcon = ({ cartItem }) => {
  // const { name, price, quantity } = cartItem

  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
