import { createContext, useState } from 'react'

// helper functions
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  // iF found, increment quantity
  // return new array with modified cartItems
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {}
})

/**
 * pseudo code for how we design our funcionality for our the cart item
 *
 * product
 * {
 *  id,
 *  name,
 *  price,
 *  imageUrl,
 * }
 *
 * Cart Item kay need ug quantity how do we solve the problem?
 *
 *  {
 *    id,
 *    name,
 *    price,
 *    imageUrl,
 *    quantity,
 *  }
 */

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // by default we use an empty array here useState([])
  const [carItems, setCartItems] = useState([])

  const value = { isCartOpen, setIsCartOpen }

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
