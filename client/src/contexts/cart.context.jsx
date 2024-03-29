import { createContext, useState, useEffect } from 'react'

// helper functions starts here
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

// cart item to remove from cart items
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // check if the quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  // return back cart items with matching cart item with reduce quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
}

// helper functions end here

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0 // <== update total: 0
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
  // for total count at checkout item
  const [cartTotal, setCartTotal] = useState(0)

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

  // for total count at checkout item, note: useEffect - govern a single responsibility
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
