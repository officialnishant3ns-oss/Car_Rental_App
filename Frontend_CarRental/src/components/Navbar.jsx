import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
      const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className=' bg-gray-200 flex items-center justify-evenly h-20'>

      <div>
        <img src={assets.logo} className='h-8' alt="" />
      </div>
      <div className={`flex gap-7 max-sm:flex-col max-sm:text-white  max-sm:bg-gray-600 max-sm:h-full max-sm:min-h-screen max-sm:w-60 max-sm:fixed top-0 border-0 right-0 max-sm:pt-20 max-sm:pl-5  max-sm:transition-transform ${sidebarOpen ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
        <ul className="flex items-center gap-8 text-xl font-semibold text-black" >
          <li>
            <NavLink
              to="/"
              className="hover:text-gray-700 transition">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/car"
              className="hover:text-gray-700 transition">
              Car
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="hover:text-gray-700 transition">
              About
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
          <button className=' font-semibold' >DashBoard</button>
          <button className='p-3 text-white bg-blue-600 border-2 border-blue-800 rounded-3xl'>Sign Up</button>
        </div>


      </div>

    </div>
  )
}

export default Navbar
