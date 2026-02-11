import React from 'react'
import { assets } from '../assets/assets'

const SearchCar = () => {
  return (
   <div>
     <div>
      <h1 className='text-4xl font-bold font-mono text-center pt-15 '>Available Car</h1>
      <p className='text-center font-normal mt-1 text-gray-500'>Browse our selection of premium vehicles available for your next adventure</p>
    </div>
    <div className='flex justify-center mt-5'>
        <img src={assets.search_icon} alt="" />
        <input type="search" name="Car-seach" id="" placeholder='Search by Brand ,models or Features'
        className='bg-white p-5 text-center'
        />
        <img src={assets.filter_icon} alt="" />

    </div>
   </div>
  )
}

export default SearchCar
