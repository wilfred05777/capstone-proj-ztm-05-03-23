import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../contexts/cart.context'

import Button from '../button/button.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems
} from './cart-dropdown.styles'

import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)

  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span>Your cart is empty</span>
        )}
      </div>

      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
