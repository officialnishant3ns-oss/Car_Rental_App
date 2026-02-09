import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

const Hero = () => {
    const [pickUpLocation, setPickUpLocation] = useState('')

    return (
        <div className='h-screen flex items-center text-center gap-14 justify-center  flex-col bg-gray-200'>

            <h1 className='text-5xl font-serif font-semibold'>Luxury Car on Rent</h1>

            <form className='px-18 py-13 flex align-center gap-x-13  bg-gray-100 rounded-4xl' >
                <div className='flex  gap-x-13 font-semibold items-center'>
                    <div className=''>
                        <select required value={pickUpLocation}
                            onChange={(e) => setPickUpLocation(e.target.value)}
                        >
                            <option value="">PickUp Location</option>
                            {
                                cityList.map((city) => <option value={city} key={city} >{city}</option>)
                            }
                        </select>
                        <p className='px-1 cursor-pointer mt-3 flex items-start text-gray-600'>{pickUpLocation ? pickUpLocation : 'Pick up Location'}</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="pickup-date">Pick-up Date</label>
                        <input
                            type="date"
                            id='pickup-date'
                            min={new Date().toISOString().split('T')[0]}
                            className="border text-gray-600 rounded mt-3 outline-none cursor-pointer"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="return-date">Return Date</label>
                        <input
                            type="date"
                            id='return-date'
                            min={new Date().toISOString().split('T')[0]}
                            className="border text-gray-600 rounded mt-3 outline-none cursor-pointer"
                            required

                        />
                    </div>
                </div>
                    <button className='flex gap-2 font-medium px-8 py-5 cursor-pointer rounded-4xl text-white  bg-blue-600'>
                        <img src={assets.search_icon} alt="search" className='brightness-300 ' />
                        Search
                    </button>
            </form>

            <img src={assets.main_car} alt="car" className='max-h-73' />
        </div>
    )
}

export default Hero
