import { createContext, useState, useEffect } from 'react'

// helper functions
const addCartItem = (cartItems, productToAdd) => {
  /* find if cartItems contains productToAdd */
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  /* if found, increment quantity*/
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  /* return new array with modified cartItems/ new cart items */
  // [{ ...productToAdd, quantity: 1 }]
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

/**
 * pseudo code for how we design our functionality for our the cart item
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
  const [cartItems, setCartItems] = useState([])

  // for cart count
  const [cartCount, setCartCount] = useState(0)

  // for cart count
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
