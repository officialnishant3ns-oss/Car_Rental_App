
import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Booking = () => {
    const {user,api,token} = useContext(AppContext)

    const [booking, setBooking] = useState([])

   const fetchBookingData = async(req, res)=>{
       try {
        const {data} = await api.get('/booking/getuserbooking')
     console.log('user data',data.bookings)
        if(data.success){
            setBooking(data.bookings)
        }
    } catch (error) {
        
    }
   }
    useEffect(() => {
        fetchBookingData()
    }, []
    )


    return (
        <div className='bg-gray-200'>
            <div className='pt-10 pl-15 mb-5'>
                <h1 className='text-3xl font-semibold '>My booking</h1>
                <p className='text-gray-500 pt-1'>View and manage your all car bookings</p>
            </div>
            <div className='pl-20 pr-15'>
                {
                    booking.map((items, index) => (
                        <div key={items._id}
                            className='grid grid-cols-3 shadow-lg bg-white border-2 border-gray-400 p-4 mt-5 gap-6 rounded-2xl'
                        >
                            <div>
                                <div>
                                    <img src={items.car.image} alt="" className='h-auto w-full object-cover aspect-video rounded-xl' />
                                    <h1 className='text-2xl font-normal mt-2'>{items.car.brand} {items.car.model} </h1>
                                    <p className='text-gray-500'> {items.car.year} {items.car.category} {items.car.location} </p>
                                </div>
                            </div>
                            <div className='ml-12 mt-3'>
                                <div className='flex justify-start gap-3 items-start '>
                                    <div className='bg-gray-200 rounded-xl px-3 py-1'>Booking #{index}</div>
                                    <div className={`px-3 py-2 text-sm font-medium rounded-full text-white ${items.status === "confirmed"
                                        ? "bg-green-500/90 text-green-700"
                                        : "bg-red-400 text-red-600"
                                        }`}>{items.status}</div>
                                </div>
                                <div className='flex gap-2  items-start mt-3'>
                                    <img className='w-4 h-4 mt-1' src={assets.calendar_icon_colored} alt="" />
                                    <div className=' gap-2'>
                                        <p className='font-semibold text-gray-500 '>Rental Period</p>
                                        <p>{items.pickupDate.split('T')[0]} - {items.returnDate.split('T')[0]} </p>

                                    </div>
                                </div>
                                <div className='flex gap-2 mt-3'>
                                    <img className='w-4 h-4 mt-1' src={assets.location_icon} alt="" />
                                    <div className=' gap-2'>
                                        <p className='font-semibold  text-gray-500 '>Pickup Location</p>
                                        <p> {items.car.location} </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 mt-3'>
                                    <img className='w-4 h-4 mt-1' src={assets.location_icon_colored} alt="" />
                                    <div className=' gap-2'>
                                        <p className='font-semibold text-gray-500 '>Return Location</p>
                                        <p> {items.location} </p>
                                    </div>
                                </div>


                            </div>


                            <div className='mt-3 ml-45'>
                                <h1 className='text-xl text-gray-600 font-normal'>Total Price</h1>
                                <p className='text-sky-700 text-3xl font-bold'>$ {items.totalprice}
                                </p>
                                <h1 className='text-xl text-gray-600 font-normal'>Booked on {items.createdAt.split('T')[0]}</h1>
                            </div>


                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default Booking
