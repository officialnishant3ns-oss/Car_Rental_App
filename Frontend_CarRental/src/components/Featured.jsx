import React, { useContext } from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Featured = () => {
    const {car,api} = useContext(AppContext)
    // console.log("car contex",car) // null value coming there
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center py-24 px-16 bg-gray-200'>

            <div>
                <Title title={'Featured vehicles'} subtitle={'Explore our selction of premium vehicles for you next adventure'} />
            </div>
            <div className='grid grid-cols-3 gap-8 mt-18'>
                {
                    car.slice(0, 6).map((car) => (
                        <div key={car._id}>
                            <Card car={car} />
                        </div>
                    ))
                }
            </div>
            <button
                onClick={() => { navigate('/car'); scrollTo(0, 0) }}
                className='flex mt-9 bg-gray-200 align-center gap-3 border-2 border-gray-500 p-3 rounded-xl'>Explore all Car <img src={assets.arrow_icon} alt="" /></button>
        </div>
    )
}

export default Featured
