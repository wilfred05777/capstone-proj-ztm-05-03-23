import { createContext, useState } from 'react'

// import PRODUCTS from '../shop-data.json'
import SHOP_DATA from '../shop-data.js'

export const ProductsContext = createContext({
  products: []
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  // diri ko nagka mali
  const value = { products }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>

    // wala nako ni gi-change ang value to value
    // <ProductsContext.Provider value={children}>
    //   {children}
    // </ProductsContext.Provider>
  )
}
