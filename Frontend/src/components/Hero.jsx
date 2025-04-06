import React from 'react'
import HeroImg from '../assets/HeroImg.jpg'
import line from '../assets/line.jpg'

function Hero() {
  return (
    <div>
      <div className='flex flex-col sm:flex-row'>
        {/* Text and Hero Image Section */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>OUR BEST SELLER</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
          </div>
        </div>
        <img className='w-24 sm:w-1/3 md:w-1/3' src={HeroImg} alt="Hero" />
      </div>
      {/* Line image from left to right of the screen */}
      <div className='w-full mt-6'>
        <img className='w-full' src={line} alt="Line" />
      </div>
    </div>
  )
}

export default Hero
