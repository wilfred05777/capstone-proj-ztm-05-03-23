import React from 'react'
import { Fragment } from 'react'
// Link is just like an anchor tag link in a plain html
import { Link, Outlet } from 'react-router-dom'

// The top level component / template
const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          Logo
        </Link>
        <div className='links-container'>
          {/* Link behaves like an anchor tag link in a plain html */}
          <Link className='nav-link' to={'/shop'}>
            Shop
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
