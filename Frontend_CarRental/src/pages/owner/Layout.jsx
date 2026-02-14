import React from 'react'
import Navbarowner from '../../components/owner/Navbarowner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbarowner />
      <div className="flex">
        <Sidebar />
        <div >
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Layout
