import React, { useContext } from 'react'
import { assets, dummyDashboardData, dummyUserData } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
const Navbarowner = () => {
    // const user = dummyUserData
    const {user}  = useContext(AppContext)
    // console.log(user.user.fullname)
  return (
    
     <div className='bg-gray-300 px-6 gap-90 text-gray-800  flex justify-around items-center h-19 relative '>
     <Link to={"/"}>
     <img src={assets.logo} alt="" />
     </Link>
     <p className=' text-xl font-semibold text-blue-600 capitalize  '><span className='font-normal text-black'>Welcome,</span> {user.user.fullname|| "Owner"}</p>
    </div>
  )
}

export default Navbarowner
