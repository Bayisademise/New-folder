import React from 'react'
import { assets } from '../../assets/assets'

const University = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500 md:text-3xl text-red-600 font-semibold'> <span className='text-red-600'>Trusted by Learners From Us </span> </p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-10'>
        <img src={assets.microsoft_logo} alt="microsoft_logo" className='w-20 md:w-28' />
        <img src={assets.walmart_logo} alt="walmart_logo" className='w-20 md:w-28' />
        <img src={assets.accenture_logo} alt="accenture_logo" className='w-20 md:w-28' />
        <img src={assets.adobe_logo} alt="adobe_logo" className='w-20 md:w-28' />
        <img src={assets.paypal_logo} alt="paypal_logo" className='w-20 md:w-28' />
      </div>
    </div>
  )
}

export default University