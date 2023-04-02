import React, { Fragment } from 'react'
import { useContext } from 'react'

/**
 *  refactor lecture : 132. Using Our CategoriesMap
 */
import './shop.styles.scss'

// without context hooks
import SHOP_DATA from '../../shop-data.json'

// with context hooks
import { ProductsContext } from '../../contexts/products.context'

import ProductCard from '../../components/product-card/product-card.component'
import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const Shop = () => {
  // const { products } = useContext(ProductsContext)
  const { categoriesMap } = useContext(CategoriesContext)

  return (
    /** refactor at lecture 133. Category Preview Component */
    <div className='shop-container'>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title]
        return <CategoryPreview key={title} title={title} products={products} />
      })}
    </div>

    /**  before refactoring 132. Using Our CategoriesMap */
    // <Fragment>
    //// one line return  => ( code here is a one line return)
    //   {Object.keys(categoriesMap).map((title) => (
    //     <Fragment key={title}>
    //       <h2>{title}</h2>
    //       <div className='products-container'>
    //         {categoriesMap[title].map((product) => (
    //           <ProductCard key={product.id} product={product} />
    //         ))}
    //       </div>
    //     </Fragment>
    //   ))}
    // </Fragment>

    /** before refactor 130. Get Products + Categories From Firestore */

    // <div className='products-container'>
    //   {/* {products.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))} */}
    // </div>
  )
}

export default Shop
