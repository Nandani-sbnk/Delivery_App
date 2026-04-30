import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './page/Home'
import Orders from './page/seller/Orders'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './page/AllProducts'
import ProductCategory from './page/ProductCategory'
import ProductDetailed from './page/ProductDetailed'
import Cart from './page/Cart'
import AddAddress from './page/AddAddress'
import MyOrders from './page/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './page/seller/SellerLayout'
import AddProducts from './page/seller/AddProducts'
import ProductList from './page/seller/ProductList'
import Loading from './components/Loading'
const App = () => {
  const {showUserLogin , isSeller} = useAppContext()
  const isSellerPath = useLocation().pathname.includes("seller")
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath?null:<Navbar/>}
      {showUserLogin ?<Login/>:null}
      <Toaster/>
      <div className={`${isSellerPath ?"":'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<AllProducts/>}/>
          <Route path="/products/:category" element={<ProductCategory/>}/>
          <Route path="/products/:category/:id" element={<ProductDetailed/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/add-address" element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/loader' element={<Loading/>}/>

          <Route path='/seller' element={isSeller?<SellerLayout/>:<SellerLogin/>}>
          <Route index element={isSeller ? <AddProducts/>:null}/>
          <Route path="product-list" element={<ProductList/>}/>
          <Route path='order' element={<Orders/>}/>

          </Route>
        </Routes>
        
      </div>
    {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App