import React from 'react'
import Card from '../components/Card'
import Featured from '../components/Featured'
import Cardetails from './Cardetails'
import SearchCar from '../components/SearchCar'
import AllCarsection from '../components/AllCarsection'

const Car = () => {
  return (
    <div className='bg-gray-200'>
   <SearchCar/>
   <AllCarsection/>
    </div>
  )
}

export default Car
