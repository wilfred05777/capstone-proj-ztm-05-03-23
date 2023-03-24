import { createContext, useState } from 'react'

import SERVICES from '../services-data.json'

export const ServicesContext = createContext({
  services: []
})

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState(SERVICES)

  const value = { services }

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  )
}
