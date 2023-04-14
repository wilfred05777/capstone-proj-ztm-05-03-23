import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
// import globalReducer from 'state' /** error 36:08-https://www.youtube.com/watch?v=0cPCMIuDk2I&list=WL&index=3&t=7195s */
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
