import React from 'react'
import { useContext } from 'react'

// without context hooks
import SHOP_DATA from '../../shop-data.json'

// with context hooks
import { ProductsContext } from '../../contexts/products.context'

const Shop = () => {
  // return <h1>I am the shop page</h1>
  const { products } = useContext(ProductsContext)

  return (
    /** with product context */
    <div>
      {products.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>

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
