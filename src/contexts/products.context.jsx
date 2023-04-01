import { createContext, useState, useEffect } from 'react'

/** 129. addCollectionAndDocuments Pt.2  */
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'

// import PRODUCTS from '../shop-data.json'

/** at lecture 129. addCollectionAndDocuments Pt.2 we no longer need this better comment it out for the below import or just leave it as it is */
import SHOP_DATA from '../shop-data.js'

export const ProductsContext = createContext({
  products: []
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  /** 129. addCollectionAndDocuments Pt.2 start
   *  this is just for storing the json data into the firebase collection
   *  and we need to comment it out now
   */
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
  /** 129. addCollectionAndDocuments Pt.2  end */

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
