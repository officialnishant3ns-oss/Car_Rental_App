import { useState,useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Car from './pages/Car'
import Cardetails from './pages/Cardetails'
import Booking from './pages/Booking'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import Addcar from './pages/owner/Addcar'
import ManageCar from './pages/owner/ManageCar'
import ManageBooking from './pages/owner/ManageBooking'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from './context/AppContext'

function App() {
  // localStorage.clear()


 const {showLogin, setShowLogin}  = useContext(AppContext)
  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      {showLogin && <Login  />}
      {!isOwnerPath && <Navbar  />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car' element={<Car />} />
        <Route path='/car-details/:id' element={<Cardetails />} />
        <Route path='/my-bookings' element={<Booking />} />
        <Route path='owner' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<Addcar />} />
          <Route path='manage-cars' element={<ManageCar />} />
          <Route path='manage-bookings' element={<ManageBooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
