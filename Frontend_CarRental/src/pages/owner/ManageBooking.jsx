import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import Titleowner from '../../components/owner/Titleowner'

const ManageBooking = () => {
    const [booking, serBooking] = useState([])
    const fetchOwnerBooking = async () => {
      serBooking(dummyMyBookingsData)
    }
    useEffect(() => {
      fetchOwnerBooking()
    }, []
    )
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
                      booking.map((booking,index)=>(
                        <tr key={index} className='border-t border-amber-800 '>
                        <td className='p-3 flex items-center gap-3'>
                           <img src={booking.car.image} className='h-12 w-12 aspect-square rounded-md object-cover' alt="" />
                           <p>{booking.car.brand} {booking.car.model} </p>
                        </td>
                        <td className='p-3 '>{booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]} </td>
                         <td className='p-3'>$ {booking.price} </td>
                         <td className='p-3 '>
                          <span className='bg-gray-200 rounded-full p-1'>
                            offline
                          </span>
                          </td>
                          <td className='p-3'>
                        {booking.status=== 'pending' ?(
                          <select>
                            <option value="PENDING">PENDING</option>
                            <option value="CANCELED">CANCELED</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                          </select>
                        ):(
                          <span className={`p-2 rounded-full text-sm font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500': 'bg-red-100 text-red-500'}`}>
                            {booking.status}
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
