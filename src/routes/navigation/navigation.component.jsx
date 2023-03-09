import React from 'react'

import { Fragment } from 'react'
// Link is just like an anchor tag link in a plain html
import { Link, Outlet } from 'react-router-dom'

/**
 * BUG on import { ReactComponent as CrwnLogo } from '/src/assets/images/crown.svg'
 *
 * https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
 *
 *
 * https://www.npmjs.com/package/vite-plugin-svgr
 */

import { ReactComponent as CrwnLogo } from '/src/assets/images/crown.svg'

import './navigation.styles.scss'

// The top level component / template
const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          <CrwnLogo className='logo' />
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
