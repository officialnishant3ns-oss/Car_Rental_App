import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const Booking = () => {

  const { api ,token} = useContext(AppContext)
  const [booking, setBooking] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookingData = async () => {
    try {
      const { data } = await api.get('/booking/getuserbooking',
        {
        headers: { Authorization: `Bearer ${token}` }
      }
      )
       console.log("booking data" , data)
      if (data.success) {
        setBooking(data.bookings || [])
      } else {
        toast.error(data?.message || "Fetch booking failed")
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookingData()
  }, [])

  if (loading) {
    return <Loader/>
  }

  return (
    <div className='bg-gray-200 min-h-screen'>

      <div className='pt-10 pl-22 mb-5'>
        <h1 className='text-3xl font-semibold'>My booking</h1>
        <p className='text-gray-500 pt-1'>
          View and manage all your car bookings
        </p>
      </div>

      <div className='pl-20 pr-15'>

        {booking.length === 0 ? (

          <p className='text-2xl font-mono text-red-600 text-center mt-20'>
            No Booking Yet
          </p>

        ) : (

          booking.map((item, index) => (

            <div
              key={item._id}
              className='grid grid-cols-3 shadow-lg bg-white border p-4 mt-5 gap-6 rounded-2xl w-5xl'
            >
              <div>
                <img
                  src={item.car?.image}
                  alt=""
                  className='w-full object-cover aspect-video rounded-xl'
                />

                <h1 className='text-2xl mt-2'>
                  {item.car?.brand} {item.car?.model}
                </h1>

                <p className='text-gray-500'>
                  {item.car?.year} {item.car?.category} {item.car?.location}
                </p>
              </div>

              <div className='ml-12 mt-3'>

                <div className='flex gap-3 items-start'>
                  <div className='bg-gray-200 rounded-xl px-3 py-1'>
                    Booking #{index + 1}
                  </div>

                  <div className={`px-3 py-2 text-sm rounded-md ${
                    item.status === "CONFIRMED"
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  }`}>
                    {item.status}
                  </div>
                </div>

                <div className='flex gap-2 mt-3'>
                  <img className='w-4 h-4 mt-1' src={assets.calendar_icon_colored} alt="" />
                  <div>
                    <p className='font-semibold text-gray-500'>Rental Period</p>
                    <p>
                      {item.pickupDate?.split('T')[0]} — {item.returnDate?.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className='flex gap-2 mt-3'>
                  <img className='w-4 h-4 mt-1' src={assets.location_icon} alt="" />
                  <div>
                    <p className='font-semibold text-gray-500'>Pickup Location</p>
                    <p>{item.car?.location}</p>
                  </div>
                </div>

                <div className='flex gap-2 mt-3'>
                  <img className='w-4 h-4 mt-1' src={assets.location_icon_colored} alt="" />
                  <div>
                    <p className='font-semibold text-gray-500'>Return Location</p>
                    <p>{item.location}</p>
                  </div>
                </div>

              </div>

              <div className='mt-3 ml-25'>
                <h1 className='text-xl text-gray-600'>Total Price</h1>

                <p className='text-sky-700 text-3xl font-bold'>
                  $ {item.totalprice}
                </p>

                <h1 className='text-xl text-gray-600 mt-3'>
                  Booked on {item.createdAt?.split('T')[0]}
                </h1>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default Booking