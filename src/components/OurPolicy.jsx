import React from 'react';
import support from '../assets/support_img.png';
import exchangeIcon from '../assets/exchange_icon.png';
import qalityIcon from '../assets/quality_icon.png';
import line from '../assets/line.jpg';

function OurPolicy() {
  return (
    <div>
      <div className='flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
          <img src={exchangeIcon} className='w-12 m-auto mb-5' alt="Exchange Icon" />
          <p className='font-semibold'>Easy Exchange policy</p>
          <p className='text-gray-400'>We offer hassle-free exchange policy</p>
        </div>
        <div>
          <img src={qalityIcon} className='w-12 m-auto mb-5' alt="Quality Icon" />
          <p className='font-semibold'>7 Days Return Policy</p>
          <p className='text-gray-400'>We provide 7 day's free retrun Policy</p>
        </div>
        <div>
          <img src={support} className='w-12 m-auto mb-5' alt="Exchange Icon" />
          <p className='font-semibold'>Best Customer support</p>
          <p className='text-gray-400'>We povide 24/7 customer support</p>
        </div>
      </div>
      {/* Line image from left to right of the screen */}
      <div className='w-full mt-6'>
        <img className='w-full' src={line} alt="Line" />
      </div>
    </div>
  );
}

export default OurPolicy;
