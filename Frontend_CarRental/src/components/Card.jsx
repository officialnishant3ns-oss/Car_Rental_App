import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Card = ({car}) => {
  const navigate = useNavigate()
  console.log(car)


  return (
    <div
    onClick={()=>{navigate(`/car-details/${car._id}`); scrollTo(0,0)}}
     className="group relative rounded-xl overflow-hidden shadow-md bg-white">

      <div className="relative">
        <img
          src={car.image}
          alt="car"
          className="w-full h-58 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {car.isAvailable  && (
          <p className="absolute top-4 left-4 bg-sky-500 text-white text-xs px-4 py-2 rounded-full">
            Available Now
          </p>
        )}

    
        <div className="absolute bottom-4 right-4 bg-black/80 text-white backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white/80">${car.pricePerDay}</span>
          <span className="text-white/80"> / Day</span>
        </div>
      </div>

    
      <div className="p-4">
        <h3 className="text-lg font-medium">{car.brand}  {car.model}</h3>
        <p className="text-sm text-gray-500">
          {car.category} • {car.year}
        </p>

        
        <div className="mt-4 grid grid-cols-2 gap-3 text-gray-600 text-sm">

          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="" />
            <span>{car.seating_capacity} seat</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.carIcon} alt="" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="" />
            <span>{car.location}</span>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Card
