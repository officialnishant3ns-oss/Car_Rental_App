import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
// import { useContext } from "react"
import { AppContext } from "../context/AppContext"


const Navbar = ({ setShowLogin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user, logout } = useContext(AppContext)



  return (
    <div className=' bg-gray-200 flex items-center justify-evenly h-20'>

      <div>
        <img src={assets.logo} className='h-8' alt="" />
      </div>
      <div className={`flex gap-7 max-sm:flex-col max-sm:text-white  max-sm:bg-gray-600 max-sm:h-full max-sm:min-h-screen max-sm:w-60 max-sm:fixed top-0 border-0 right-0 max-sm:pt-20 max-sm:pl-5  max-sm:transition-transform ${sidebarOpen ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
        <ul className="flex items-center gap-8 text-xl font-normal text-black" >
          <li>
            <NavLink
              to="/"
              className="hover:text-red-700 transition">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/car"
              className="hover:text-red-700 transition">
              Car
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className="hover:text-red-700 transition">
              My Booking
            </NavLink>
          </li>
        </ul>

        <div className=" flex items-center w-80 px-4 py-2 border-3 border-gray-500 rounded-full focus-within:ring-2 focus-within:ring-amber-400 transition max-sm:hidden">
          <input
            type="text"
            placeholder="Search cars..."
            className="flex-1 outline-none text-gray-800 placeholder-gray-700"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
          />

        </div>

        <div className='flex items-center justify-center gap-x-10'>
          <Link to={'/owner'}>
            <button className='text-xl cursor-pointer  font-normal' >DashBoard</button>
          </Link>
          {/* <button 
          onClick={()=>{setShowLogin(true)}}
           className='py-3 px-6 text-white bg-blue-600 border-2 border-blue-800 rounded-3xl'>Login
           </button> */}
          {user ? (
            <button
              onClick={logout}
              className="py-3 px-6 text-white bg-red-500 border-3 border-red-800 rounded-3xl"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="py-3 px-6 text-white bg-blue-600 border-3 border-blue-800 rounded-3xl"
            >
              Login
            </button>
          )}

        </div>


      </div>

    </div>
  )
}

export default Navbar
