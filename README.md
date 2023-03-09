# capstone-proj-ztm-05-03-23

```js
// 86. Navigation Bar Component
import React, { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './routes/home/home.components'

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am the navigation</h1>
      </div>
      <Outlet />
    </div>
  )
}

const Shop = () => {
  return <h1>I am the shop page</h1>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        {/* index is matching the as the base component  */}
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
}

export default App
```

```js
// lesson : 85. React Router Outlet
<Routes>
  <Route path='/home' element={<Home />}>
    <Route path='shop' element={<Shop />} />
    {/* /home/shop */}
  </Route>
  {/* code above - it is No longer a sibling but nested element -> Parent level add a <Outlet/> to render the nested which is /shop, because it will only render the parent level element. */}

  {/* <Route path='/' element={<Home />} /> */}
  {/* <Route path='/shop' element={<Shop />} /> */}
</Routes>
```
