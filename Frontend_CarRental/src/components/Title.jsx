import React from 'react'

const Title = ({title,subtitle,align}) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align==='left'}`}>
      <h1 className='text-5xl font-semibold'>{title}</h1>
      <p className='text-sm mt-2 text-gray-500/90'>{subtitle}</p>
    </div>
  )
}

export default Title
