import React from 'react'
import Card from './Card';
import { dummyCarData } from '../assets/assets';
import { assets } from '../assets/assets';
const AllCarsection = () => {

  return (
    <div className=' p-25'>
        <div className='text-2xl text-gray-500  mb-3'>
            All Featured Car
        </div>
       <div className='grid grid-cols-3 gap-8 '>
                {
                    dummyCarData.slice(0, 6).map((car) => (
                        <div key={car._id}>
                            <Card car={car} />
                        </div>
                    ))
                }
            </div>
              </div>
  )
}

export default AllCarsection
