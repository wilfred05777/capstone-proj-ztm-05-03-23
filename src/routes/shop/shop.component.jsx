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

const Shop = () => {
  // const { products } = useContext(ProductsContext)
  const { categoriesMap } = useContext(CategoriesContext)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className='products-container'>
            {categoriesMap[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>

    /** before refactor */

    // <div className='products-container'>
    //   {/* {products.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))} */}
    // </div>
  )
}

export default Shop
