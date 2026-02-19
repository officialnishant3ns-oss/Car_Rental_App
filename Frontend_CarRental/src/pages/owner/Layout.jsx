import React, { useContext, useEffect } from 'react'
import Navbarowner from '../../components/owner/Navbarowner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const Layout = () => {
  const navigate = useNavigate()
  const { user, isOwner, naviga } = useContext(AppContext)

  useEffect(() => {
    if (!isOwner) {
      navigate('/')
    }
  }, []
  )
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
