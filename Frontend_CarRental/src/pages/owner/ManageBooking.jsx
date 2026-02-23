import React, { useContext, useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import Titleowner from '../../components/owner/Titleowner'
import { AppContext } from '../../context/AppContext'

const ManageBooking = () => {

  const { user, token, api } = useContext(AppContext)
  const [bookings, setBooking] = useState([])

  const fetchBookingData = async () => {
    try {
      const { data } = await api.get('/car/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      if (data.success) {
        setBooking(data.dashboardData)
      }
      else {
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
  const changeStatus = async () => {
    try {

      if (condition) {

      } else {
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
    if (token) fetchBookingData()
  }, [token])
  return (
    <div className='p-8 w-full'>
      <Titleowner
        title="Manage Booking"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      <div className='mt-4 max-w-3xl w-full rounded-md overflow-hidden border-2 border-amber-950'>
        <table className='w-full text-left text-sm text-gray-600 border-collapse'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium'>Date Range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium'>Payment</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map((item) => (
                <tr key={item._id} className='border-t border-amber-800 '>
                  <td className='p-3 flex items-center gap-3'>
                    <img src={item.car.image} className='h-12 w-12 aspect-square rounded-md object-cover' alt="" />
                    <p>{item.car.brand} {item.car.model} </p>
                  </td>
                  <td className='p-3 '>{item.pickupDate.split('T')[0]} to {item.returnDate.split('T')[0]} </td>
                  <td className='p-3'>$ {item.price} </td>
                  <td className='p-3 '>
                    <span className='bg-gray-200 rounded p-2'>
                      offline
                    </span>
                  </td>
                  <td className='p-3'>
                    {item.status === 'pending' ? (
                      <select
                        onChange={(e) => changeStatus(item._id, e.target.value)}
                        className='border-2 border-gray-500 rounded p-1.5'>
                        <option value="PENDING">PENDING</option>
                        <option value="CANCELED">CANCELED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                      </select>
                    ) : (
                      <span className={`rounded p-2.5 text-sm font-semibold ${item.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            }
          </tbody>


        </table>
      </div>
    </div>
  )
}

export default ManageBooking
