import React from 'react'
import { useContext } from 'react'

import './shop.styles.scss'

// without context hooks
import SHOP_DATA from '../../shop-data.json'

// with context hooks
import { ProductsContext } from '../../contexts/products.context'

import ProductCard from '../../components/product-card/product-card.component'

const Shop = () => {
  const { products } = useContext(ProductsContext)

  return (
    /** lecture 115-Product-Card-Component */
    <div className='products-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    /** with product context */
    // <div>
    //   {products.map(({ id, name }) => (
    //     <div key={id}>
    //       <h1>{name}</h1>
    //     </div>
    //   ))}
    // </div>

    /** without products */
    // <div>
    // {SHOP_DATA.map(({ id, name }) => (
    //   <div key={id}>
    //     <h1>{name}</h1>
    //   </div>
    // ))}
    // </div>
  )
}

export default Shop
