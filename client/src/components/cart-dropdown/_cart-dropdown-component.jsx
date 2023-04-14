import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../contexts/cart.context'

import Button from '../button/button.component'

import './cart-dropdown.styles.scss'

import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)

  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <div className='cart-dropdown-container'>
      {/* <h2>Cart CartDropDown</h2> */}
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}

        {/* {[].map((item) => (
          <CartItem cartItem={item} />
        ))} */}
      </div>

      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
