import React from 'react'
import HeroImg from '../assets/Heroo-removebg-preview.png'
import line from '../assets/line.jpg'

function Hero() {
  return (
    <div>
      <div className='flex flex-col sm:flex-row px-4 sm:px-[5vw] md:px-[4vw] lg:px-[9vw]'>
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
        <img className='w-120 border-4 px- bg-yellow-500' src={HeroImg} alt="Hero" />

      </div>
      {/* Line image from left to right of the screen */}
      <div className='w-full '>
                      <img className='w-full mt-0.5' src={line} alt="Line" />
                  </div>
    </div>
    
  )
}

export default Hero
