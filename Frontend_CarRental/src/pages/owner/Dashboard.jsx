import React from 'react'
import Titleowner from '../../components/owner/Titleowner'
import { assets, dummyDashboardData } from '../../assets/assets'

const Dashboard = () => {
  const data = dummyDashboardData

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
            <p className="text-2xl text-center font-bold">{data.completedBookings}</p>
          </div>
          <img
            src={assets.listIconColored}
            alt="car icon"
            className="w-10 h-9 object-contain"
          />
        </div>
      </div>
      <div>
      <h1>  Recent Booking</h1>
      <p></p>
      </div>
    </div>
  )
}

export default Dashboard
