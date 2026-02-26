import React, { useState } from 'react'
import Card from '../components/Card'
import Featured from '../components/Featured'
import Cardetails from './Cardetails'
import SearchCar from '../components/SearchCar'
import AllCarsection from '../components/AllCarsection'

const Car = () => {
  const [search , setSearch] = useState('')
  return (
    <div className='bg-gray-200'>
   <SearchCar search={search} setSearch={setSearch} />
   <AllCarsection  search={search} setSearch={setSearch}  />
    </div>
  )
}

export default Car
