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
      </Routes>

 <Footer/>
    </>
  )
}

export default App
