
import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../assets/assets'

const Booking = () => {
    const [booking, setBooking] = useState([])

    const fetchdata = async () => {
        setBooking(dummyMyBookingsData)
    }
    useEffect(() => {
        fetchdata()
    }, []
    )


    return (
        <div className='bg-gray-200'>
            <div className='pt-10 pl-15 mb-5'>
                <h1 className='text-3xl font-semibold '>My booking</h1>
                <p className='text-gray-500 pt-1'>View and manage your all car bookings</p>
            </div>
            <div className='pl-15 pr-15'>
                {
                    dummyMyBookingsData.map((booking, index) => (
                        <div key={booking._id}
                            className='grid grid-cols-4 shadow-lg bg-white border-2 border-gray-400 p-4 mt-5 gap-6 rounded-2xl'
                        >
                            <div>
                                <div>
                                    <img src={booking.car.image} alt="" className='h-auto w-full object-cover aspect-video rounded-xl' />
                                    <h1 className='text-2xl font-normal mt-2'>{booking.car.brand} {booking.car.model} </h1>
                                    <p className='text-gray-500'> {booking.car.year} {booking.car.category} {booking.car.location} </p>
                                </div>
                            </div>
                            <div className='flex justify-start gap-2 items-start '>
                                <div className='bg-gray-200 rounded-xl px-3 py-1'>Booking #{index}</div>
                                <div className={`px-3 py-2 text-sm font-medium rounded-full text-white ${booking.status === "confirmed"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}>{booking.status}</div>
                            </div>

                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default Booking
