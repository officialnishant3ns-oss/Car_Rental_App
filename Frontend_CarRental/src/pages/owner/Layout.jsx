import React from 'react'
import Navbarowner from '../../components/owner/Navbarowner'
import Sidebar from '../../components/owner/Sidebar'

const Layout = () => {
  return (
   <>
    <div>
      <Navbarowner />
    </div>
    <div>
        <Sidebar/>
        </div>
        </>
  )
}

export default Layout
