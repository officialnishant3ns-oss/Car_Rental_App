import { useState } from 'react'
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

function App() {
  const [showLogin, setShowLogin] = useState(false)

  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')

  return (
    <> 
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car' element={<Car />} />
        <Route path='/car-details/:id' element={<Cardetails />} />
        <Route path='/my-bookings' element={<Booking />} />
        <Route path='owner' element={<Layout/>} >
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<Addcar />} />
          <Route path='manage-cars' element={<ManageCar />} />       
          <Route path='manage-bookings' element={<ManageBooking />} />       
        </Route>
      </Routes>

{!isOwnerPath &&  <Footer/>}
    </>
  )
}

export default App
