import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Testmonial from '../components/Testmonial'
import Newslaetter from '../components/Newsletter'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className='bg-gray-200'>
    <Hero/>
    <Featured/>
    <Banner/>
    <Testmonial />
    <Newsletter/>
    </div>
  )
}

export default Home
