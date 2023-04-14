import React from 'react'
import Directory from '../../components/directory/directory.component'
import { Outlet } from 'react-router-dom'

const Home = () => {
  // const categories = [
  //   {
  //     id: 1,
  //     title: 'hats',
  //     cta: 'Shop Now',
  //     imageUrl: 'https://i.ibb.co/cvpntL1/hats.png'
  //   },
  //   {
  //     id: 2,
  //     title: 'jackets',
  //     cta: 'Shop Now',
  //     imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png'
  //   },
  //   {
  //     id: 3,
  //     title: 'sneakers',
  //     cta: 'Shop Now',
  //     imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png'
  //   },
  //   {
  //     id: 4,
  //     title: 'womens',
  //     cta: 'Shop Now',
  //     imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
  //   },
  //   {
  //     id: 5,
  //     title: 'mens',
  //     cta: 'Shop Now',
  //     imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
  //   }
  // ]
  return (
    <>
      {/* <Directory categories={categories} /> */}
      <Directory />
      <Outlet />
    </>
  )
}

export default Home
