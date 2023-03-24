import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'

import { UserProvider } from './contexts/user.context'
import { ProductsProvider } from './contexts/products.context'
import { ServicesProvider } from './contexts/services.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * for the mean time para mo gana ang application for development purposesgi remove sa nako ang
   * */

  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <ProductsProvider>
        <ServicesProvider>
          <App />
        </ServicesProvider>
      </ProductsProvider>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
