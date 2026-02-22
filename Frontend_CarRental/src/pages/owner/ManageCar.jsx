import React, { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Titleowner from '../../components/owner/Titleowner'

const ManageCar = () => {
  const [car, setCar] = useState([])
  const fetchOwnerCar = async () => {
    setCar(dummyCarData)
  }
  useEffect(() => {
    fetchOwnerCar()
  }, []
  )
  return (
    <div className='p-8 w-full'>
      <Titleowner
        title="Manage Car"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      <div className='mt-4 max-w-3xl w-full rounded-md overflow-hidden border-2 border-amber-950'>
        <table className='w-full text-left text-sm text-gray-600 border-collapse'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {car.map((car, index) => (
              <tr key={index} className='border-t border-amber-800 '>
                <td className='p-3 flex items-center gap-5'>
                  <img src={car.image} className='h-12 w-12 aspect-square rounded-md object-cover' alt="" />
                  <div >
                    <p className='font-medium'>{car.brand} {car.model} </p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} {car.transmission} </p>
                  </div>
                </td>
                <td>{car.category} </td>
                <td>$ {car.pricePerDay} /day </td>
          
          <td className='p-3'>
           <span className={`px-3 py-2 rounded-full text-xs ${
            car.isAvaliable ? 'bg-green-100 text-green-500'  :'bg-red-100 text-red-500'
           }`}>
            {car.isAvaliable ? 'Available' : 'Unavialable'}
           </span>
          </td>
               <td className='flex items-center p-3'>
            <img className='cursor-pointer' src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" />
             <img className='cursor-pointer' src={assets.delete_icon} alt="" />
               </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ManageCar
