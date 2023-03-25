import React from 'react'

import Button from '../button/button.component'

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
  return (
    <div className='cart-dropdown-container'>
      {/* <h2>Cart CartDropDown</h2> */}
      <div className='cart-items' />
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
