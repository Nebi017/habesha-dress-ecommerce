import React from 'react'
import HeroImg from '../assets/HeroImg.jpg'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className='w-full sm:w-1/2 flex items-center justify-ecnter py-10 sm:py-0'>
      <div className='text-[#414141'>
        <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141'></p>
            <p className='font-medim text-sm md:text'>OUR BEST SELLER</p>

        </div>
        <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
        <div className='flex items-center gap-2'>
           <p className='font-semibold text-sm md:text-base'>SHOPE NOW</p>
           <p className='w-8 md:w-11 h-1[1px] bg-[#4141]'></p>
        </div>

      </div>
      </div>
      <img className='w-24 sm:w-1/3 md:w-1/3 ' src={HeroImg} alt="" />

    </div>
  )
}

export default Hero
