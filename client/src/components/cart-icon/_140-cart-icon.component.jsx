import React, { useContext } from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon-styles.scss'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = ({ cartItem }) => {
  // const { name, price, quantity } = cartItem

  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className='cart-icon-container ' onClick={toggleIsCartOpen}>
      {/* <h2>CartIcon</h2> */}
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
      {/* <span className='item-count'>{quantity}</span> */}
      {/* <span className='item-count'>0</span> */}
    </div>
  )
}

export default CartIcon
