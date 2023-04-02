import { createContext, useState, useEffect } from 'react'

/** 129. addCollectionAndDocuments Pt.2  */
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'

/**130. Get Products + Categories From Firestore */
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

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

  /** 130. Get Products + Categories From Firestore start
   * LEARNING NOTES:
   * And secondly, we also learned about using async functions
   * inside of use effect.
   * We want to make our own new async function within the callback,
   * and then what we want to do is we want to call it inside of
   * the same callback after it's been initialized.
   */
  useEffect(() => {
    // getCategoriesMap Method defined
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
    }
    getCategoriesMap() // after defining it its time invoking it useEffect getCategories here
  }, []) // [] putting this will restrict after the provider is being mounted

  /** 130. Get Products + Categories From Firestore end */

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
