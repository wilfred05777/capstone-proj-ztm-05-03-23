// @ts-nocheck

import React, { Fragment, useContext } from 'react'
// Link is just like an anchor tag link in a plain html
import { Link, Outlet } from 'react-router-dom'

/**
 * Vite and SVG rendering for navigation fixes and issues
 *
 * BUG on import { ReactComponent as CrwnLogo } from '/src/assets/images/crown.svg'
 *
 *
 * https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
 *
 * !Solution!: just follow the link below to fix the issue
 * https://www.npmjs.com/package/vite-plugin-svgr
 *
 *
 */

import { ReactComponent as Logo } from '../../assets/images/crown.svg'
import { UserContext } from '../../contexts/user.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component'
import { CartContext } from '../../contexts/cart.context'

// The top level component / template
const Navigation = () => {
  const { isCartOpen } = useContext(CartContext)

  const { currentUser } = useContext(UserContext)
  // const { currentUser, setCurrentUser } = useContext(UserContext)
  // console.log(currentUser)

  // const signOutHandler = async () => {
  //   // const res = await signOutUser()
  //   // console.log(res)

  //   await signOutUser()
  //   setCurrentUser(null)
  // }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          <Logo className='logo' />
        </Link>
        <div className='nav-links-container'>
          {/* Link behaves like an anchor tag link in a plain html */}
          <Link className='nav-link' to={'/shop'}>
            SHOP
          </Link>
          {/* once a user clicks and if it successfully sign-in and sign-up the sign-in navigation menu will change to SIGN-OUT */}
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              {/* <span className='nav-link' onClick={signOutHandler}> */}
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to={'/auth'}>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
