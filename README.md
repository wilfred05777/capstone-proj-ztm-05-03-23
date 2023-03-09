# capstone-proj-ztm-05-03-23

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
