import React, { useState } from 'react'
import Titleowner from '../../components/owner/Titleowner'
import { assets } from '../../assets/assets'

const Addcar = () => {
  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    category: '',
    pricePerDay: 0,
    transmission: '',
    fuel_type: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  })

  const submitHandler = async (e) => {
    e.preventDefault()
  }
  return (
    <div className='p-8'>
      <Titleowner
        title="Add Car"
        subtitle="Fill in details to list a new car for booking , including vailabiilty and car specification  there  "
      />
      <hr />
      <form action=""
        className='flex flex-col gap-5 text-sm text-gray-700 mt-6 max-w-3xl'
        onSubmit={submitHandler}>
        <div className='flex items-center gap-5 w-full'>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className='h-20 border-1 border-amber-950 rounded-xl cursor-pointer'
              alt="" />
            <input
              onChange={e => setImage(e.target.files[0])}
              id="image"
              type="file"
              name="car-image"
              accept="image/*"
              className="hidden" />
          </label>
          <p className='text-sm text-gary-500'>Upload a Picture of Car</p>
        </div>


        <div className='grid grid-cols-2 gap-8'>
          <div className='flex flex-col w-full '>
            <label htmlFor="brand">Brand</label>
            <input
              className='px-4 py-3 mt-1 border-2 border-amber-950 rounded-md'
              value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })}
              required type="text" name="brand" placeholder='e.g BMW , Mercedes , Audi...' />
          </div>
          <div className='flex flex-col w-full '>
            <label htmlFor="model">Model</label>
            <input
              className='px-4 py-3 mt-1 border-2 border-amber-950 rounded-md'
              value={car.model} onChange={e => setCar({ ...car, model: e.target.value })}
              required type="text" name="model" placeholder='e.g  X5 , E-class , M-4' />

          </div>

        </div>

        <div className='grid grid-cols-3 gap-10 w-full mt-2'>
          <div className='flex flex-col w-full '>
            <label htmlFor="year">Year</label>
            <input
              className='px-4 py-3 mt-1 border-2 border-amber-950 rounded-md'
              value={car.year} onChange={e => setCar({ ...car, year: e.target.value })}
              required type="Number" name="year" placeholder='2025' />
          </div>
          <div className='flex flex-col w-full '>
            <label htmlFor="price">Price Per Day</label>
            <input
              className='px-4 py-3 mt-1 border-2 border-amber-950 rounded-md'
              value={car.pricePerDay} onChange={e => setCar({ ...car, pricePerDay: e.target.value })}
              required type="Number" name="pricePerDay" placeholder='Enter Price per Day' />
          </div>
          <div className='flex flex-col w-full '>
            <label htmlFor="Category">Category</label>
            <select name=""
              value={car.category}
              className='px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md'
              onChange={e => setCar({ ...car, category: e.target.value })}>
              <option value="">Select a Category</option>
              <option value="Sedan"> Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>

        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='flex flex-col w-full '>
            <label htmlFor="transmission">Transmission</label>
            <select name=""
              value={car.transmission}
              className='px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md'
              onChange={e => setCar({ ...car, transmission: e.target.value })}>
              <option value="">Select a Transmission</option>
              <option value="Automatic"> Automatic</option>
              <option value="Manual">Manual</option>
              <option value="sm">Semi Automatic</option>
            </select>
          </div>
          <div className='flex flex-col w-full '>
            <label htmlFor="fuel_type">Fuel Type</label>
            <select name=""
              value={car.fuel_type}
              className='px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md'
              onChange={e => setCar({ ...car, fuel_type: e.target.value })}>
              <option value="">Select a Fuel Type</option>
              <option value="Gas"> Gas</option>
              <option value="Diesal">Diesal</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>
          <div className='flex flex-col w-full '>
            <label htmlFor="seating_capacity">Seat CapaCity</label>
            <input
              className='px-4 py-3 mt-1 border-2 border-amber-950 rounded-md'
              value={car.seating_capacity} onChange={e => setCar({ ...car, seating_capacity: e.target.value })}
              required type="Number" name="seating_capacity" placeholder='e.g 2 ,3 ,4' />
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <div className='flex flex-col w-full '>
            <label htmlFor="location">Location</label>
            <select name=""
              value={car.location}
              className='px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md'
              onChange={e => setCar({ ...car, location: e.target.value })}>
              <option value="">Select a Location</option>
              <option value="Los Angeles"> Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="New York">New York</option>
              <option value="Houston">Houston</option>
            </select>
          </div>

        </div>
        <div className='flex w-full'>
          <div className='flex flex-col w-full '>
            <label htmlFor="description">Description</label>
            <textarea
              className='px-4 py-3 mt-1 border-2 h-30 border-amber-950 rounded-md'
              value={car.description} onChange={e => setCar({ ...car, description: e.target.value })}
              required type="text" name="model" placeholder='e.g  A Luxurious SUV with spacious interior and PwerFul Engine'> </textarea>

          </div>
        </div>

        <button className='flex items-center gap-2 px-5 py-4 text-white bg-blue-600 cursor-pointer rounded-xl w-max'>
          <img src={assets.tick_icon} alt="" />
          List Your Car
        </button>

      </form>

    </div>
  )
}

export default Addcar
