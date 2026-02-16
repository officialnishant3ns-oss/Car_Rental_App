import React from 'react'

const Titleowner = ({title,subtitle}) => {
  return (
    <div>
        <h1 className='font-semibold font-sans  text-3xl'>{title}</h1>
        <p className='font-normal mt-2 text-gray-500 '>{subtitle} </p>
    </div>
  )
}

export default Titleowner
