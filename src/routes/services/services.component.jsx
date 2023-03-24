import React, { useContext } from 'react'
import SERVICES_DATA from '../../services-data.json'

import { ServicesContext } from '../../contexts/services.context'

const Services = () => {
  const { services } = useContext(ServicesContext)

  return (
    /**with react useContext api
     * bug at the moment
     * **/

    <div>
      {services.map(({ id, services }) => (
        <div key={id}>
          <h2>{services}</h2>
        </div>
      ))}
    </div>

    /**without react useContext api**/
    // <div>
    //   {SERVICES_DATA.map(({ id, service }) => (
    //     <div key={id}>
    //       <h2>{service}</h2>
    //     </div>
    //   ))}
    // </div>
  )
}

export default Services
