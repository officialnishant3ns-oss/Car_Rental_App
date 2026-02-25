import React, { useContext } from 'react'
import Card from './Card';
import { dummyCarData } from '../assets/assets';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
const AllCarsection = () => {
  const {car} = useContext(AppContext)
  return (
    <div className=' p-25'>
        <div className='text-2xl text-gray-500  mb-3'>
            All Featured Car
        </div>
       <div className='grid grid-cols-3 gap-8 '>
                     {car?.length ? (
          car.map(item => (
            <div key={item._id}>
              <Card car={item} />
            </div>
          ))
        ) : (
          <p>No cars available</p>
        )}
            </div>
              </div>
  )
}

export default AllCarsection
