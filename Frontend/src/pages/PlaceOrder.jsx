import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [methode, setMethode] = useState('cod');
  const { navigate } = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Form */}
      <div className='flex flex-col gap-4 w-full sm:max-w-3'>
        <div className='text-x1 sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5' type='text' placeholder='First name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5' type='text' placeholder='Last name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-123' type='text' placeholder='Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-123' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5' type='text' placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5' type='number' placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5' type='text' placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-123' type='number' placeholder='Phone' />
      </div>

      {/* Right Section */}
      <div className='mt-8 ml-0'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        {/* Payment Methods */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODE'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* Stripe */}
            <div onClick={() => setMethode('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-[14px] h-[14px] border rounded-full ${methode === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />
            </div>

            {/* Razorpay */}
            <div onClick={() => setMethode('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-[14px] h-[14px] border rounded-full ${methode === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt='' />
            </div>

            {/* Cash on Delivery */}
            <div onClick={() => setMethode('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-[14px] h-[14px] border rounded-full ${methode === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
