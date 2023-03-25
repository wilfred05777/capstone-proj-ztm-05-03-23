import React from 'react'
import './cart-item.styles.scss'

const CartItem = ({ cartItem }) => {
  const { name, qunatity } = cartItem

  return (
    <div>
      <h2>{name}</h2>
      <span>{qunatity}</span>
    </div>
  )
}

export default CartItem
