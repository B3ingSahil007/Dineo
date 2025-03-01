import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Welcome from './pages/Welcome'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Users from './pages/Users'
import PromoCode from './pages/PromoCode'
import Setting from './pages/Setting'
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const url = 'http://localhost:4000';
  const currency = "₹";
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition:Slide bodyClassName="toastBody" />
      <div>
        <Navbar />
        <hr className='border-none h-[1px] bg-purple-700' />
          <div className="app-content flex h-screen">
            <SideBar />
            <div className='flex-1 overflow-y-auto'>
              <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/allusers' element={<Users url={url} />} />
                <Route path='/add' element={<Add url={url} currency={currency} />} />
                <Route path='/list' element={<List url={url} currency={currency} />} />
                <Route path='/orders' element={<Orders url={url} currency={currency} />} />
                <Route path='/coupons' element={<PromoCode />} />
                <Route path='/settings' element={<Setting />} />
              </Routes>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
