// import React, { useContext, useEffect, useState } from 'react';
// import { assets, products } from '../assets/assets.js';
// import { ShopContext } from '../context/ShopContext.jsx';
// import Title from '../components/Title.jsx';
// import CartTotal from '../components/CartTotal.jsx';

// const Cart = () => {
//   const { currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     const tempData = [];
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         if (cartItems[itemId][size] > 0) {
//           tempData.push({
//             _id: itemId,
//             size: size,
//             quantity: cartItems[itemId][size],
//           });
//         }
//       }
//     }
//     setCartData(tempData);
//   }, [cartItems]);

//   return (
//     <div className='border-t pt-14'>
//       <div className='text-2xl mb-3'>
//         <Title text1='Your' text2='Cart' />
//       </div>
//       <div>
//         {cartData.map((item, index) => {
//           const productData = products.find((product) => product._id == item._id); // Loose equality to allow string/number match

//           if (!productData) {
//             return <p key={index}>Product not found</p>;
//           }

//           return (
//             <div
//               key={index}
//               className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
//             >
//               <div className='flex items-start gap-6'>
//                 <img
//                   className='w-16 sm:w-20'
//                   src={Array.isArray(productData.image) ? productData.image[0] : productData.image}
//                   alt={productData.name}
//                 />
//                 <div>
//                   <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                   <div className='flex items-center gap-5 mt-2'>
//                     <p>{currency}{productData.price}</p>
//                     <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
//                   </div>
//                 </div>
//               </div>

//               <input
//                 onChange={(e) =>
//                   e.target.value === '' || e.target.value === '0'
//                     ? null
//                     : updateQuantity(item._id, item.size, Number(e.target.value))
//                 }
//                 className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
//                 type='number'
//                 min={1}
//                 defaultValue={item.quantity}
//               />

//               <img
//                 onClick={() => updateQuantity(item._id, item.size, 0)}
//                 className='w-4 mr-4 sm:w-5 cursor-pointer'
//                 src={assets.bin_icon}
//                 alt='Remove item'
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className='w-full text-end'>
//             <button
//               onClick={() => navigate('/place-order')}
//               className='bg-black text-white text-sm my-8 px-8 py-3'
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;import React, { useContext, useEffect, useState } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { cartItems, products, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [expandedSizeIndex, setExpandedSizeIndex] = useState(null);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const sizeKey in cartItems[itemId]) {
        const cartEntry = cartItems[itemId][sizeKey];
        if (cartEntry.quantity > 0) {
          tempData.push({
            _id: itemId,
            sizeKey,
            quantity: cartEntry.quantity,
            measurements: cartEntry.measurements || {},
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[5vw]'>
      <div className='text-2xl mb-3'>
        <Title text1='Your' text2='Cart' />
      </div>
      <div>
        {cartData.map((item, index) => {
          const product = products.find((product) => product._id === item._id);
          if (!product) return <p key={index}>Product not found</p>;

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
            >
              <div className='flex items-start gap-6'>
                <img
                  className='w-16 sm:w-20'
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{product.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{product.price}</p>
                    
                  </div>
                  <button
                    onClick={() => setExpandedSizeIndex(index === expandedSizeIndex ? null : index)}
                    className='text-xs text-white hover:text-white bg-amber-950 mt-1 border-4 bg-black p-2'
                  >
                    VIEW SIZE
                  </button>
                  {expandedSizeIndex === index && (
                    <div className='mt-2 text-xs bg-gray-100 p-2 rounded'>
                      {Object.entries(item.measurements).map(([key, value]) => (
                        <p key={key} className='text-gray-600'>{`${key.toUpperCase()}: ${value} cm`}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.sizeKey, Number(e.target.value))
                }
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type='number'
                min={1}
                defaultValue={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.sizeKey, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt='Remove item'
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
