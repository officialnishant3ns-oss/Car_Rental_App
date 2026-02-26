import React, { useContext, useEffect, useState } from 'react'
import Titleowner from '../../components/owner/Titleowner'
import { assets, dummyDashboardData } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const {token,api,isOwner} = useContext(AppContext)
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completeBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0
  })
    const fecthBookingData = async()=>{
      try {
        const {data} =await api.get('/car/dashboard' ) 
        console.log(data)
        if(data.success){
          setData(data.dashboardData)
        }
        else{
            toast.error(data?.message || "Fetch booking failed")
        }
      } catch (error) {
         toast.error(
          error.response?.data?.message ||
          error.message ||
          "Something went wrong"
        )
      }
    }
  useEffect(() => {
   if(isOwner){
    fecthBookingData()
   }
  }, []
  )

  return (
    <div className="p-8">

      <Titleowner
        title="Admin Dashboard"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

        <div className="bg-white shadow-lg rounded-xl py-7 px-10 gap-5 flex items-center justify-center">
          <div>
            <p className="text-gray-600">Total Cars</p>
            <p className="text-2xl text-center font-bold">{data.totalCars}</p>
          </div>
          <img
            src={assets.carIconColored}
            alt="car icon"
            className="w-10 h-9 object-contain"
          />
        </div>
        <div className="bg-white shadow-lg rounded-xl py-7 px-10 gap-5 flex items-center justify-center">
          <div>
            <p className="text-gray-600">Total Bookings</p>
            <p className="text-2xl text-center font-bold">{data.totalBookings}</p>
          </div>
          <img
            src={assets.listIconColored}
            alt="car icon"
            className="w-10 h-9 object-contain"
          />
        </div>
        <div className="bg-white shadow-lg rounded-xl py-7 px-10 gap-5 flex items-center justify-center">
          <div>
            <p className="text-gray-600">Pending Booking</p>
            <p className="text-2xl text-center font-bold">{data.pendingBookings}</p>
          </div>
          <img
            src={assets.cautionIconColored}
            alt="car icon"
            className="w-10 h-9 object-contain"
          />
        </div>
        <div className="bg-white shadow-lg rounded-xl py-7 px-10 gap-5 flex items-center justify-center">
          <div>
            <p className="text-gray-600">Complete Booking</p>
            <p className="text-2xl text-center font-bold">{data.completeBookings}</p>
          </div>
          <img
            src={assets.listIconColored}
            alt="car icon"
            className="w-10 h-9 object-contain"
          />
        </div>
      </div>

      <div className='flex flex-wrap items-start gap-12 mb-8 w-full mt-12'>
        <div className='p-6 border-2 border-amber-950 rounded-md'>
          <h1 className='text-xl font-medium'>Recent Booking</h1>
          <h1 className='text-gray-600 font-normal'>Latest Customer Bookings </h1>
          {
            data.recentBookings?.filter(b => b.car).map((booking, index) => (
              <div key={index} className='mt-4 flex items-center gap-8 justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center justify-center w-13 h-13 rounded-full'>
                    <img src={assets.listIconColored} alt="" />
                  </div>
                  <div>
                    <p>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-sm text-gray-600'>{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4 font-medium '>
                  <p className='text-lg text-gray-900'>$ {booking.price}</p>
                  <p className='px-5 py-1 border-2 border-amber-950 rounded-full'>{booking.status}</p>
                </div>
              </div>
            ))
          }

        </div>
        {/* revenue */}
        <div className='p-6 mb-6 border-2 border-amber-950 rounded-md '>
          <h1 className='text-lg  font-medium' >Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold '>$ {data.monthlyRevenue} </p>
        </div>
       
      </div>

    </div>
  )
}

export default Dashboard