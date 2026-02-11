import React from 'react'
import { assets } from '../assets/assets'

const SearchCar = () => {
  return (
   <div>
     <div>
      <h1 className='text-4xl font-bold font-mono text-center pt-15 '>Available Car</h1>
      <p className='text-center font-normal mt-1 text-gray-500'>Browse our selection of premium vehicles available for your next adventure</p>
    </div>
  <div className="flex justify-center mt-5">
    <div></div>
  <div className="relative w-[650px] ">
    <img
      src={assets.search_icon}
      alt="search"
      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
    />

    <input
      type="search"
      name="Car-search"
      placeholder="Search by Brand, Models or Features"
      className="w-full pl-10 pr-10 py-4 rounded-xl border outline-none focus:ring-2 focus:ring-primary"
    />

    <img
      src={assets.filter_icon}
      alt="filter"
      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer opacity-60"
    />

  </div>
</div>

   </div>
  )
}

export default SearchCar
