import React, { useContext, useEffect, useState } from 'react'; // ✅ Added useState import
import { ShopContext } from '../context/ShopContext'; // ✅ Corrected import path
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) { // ✅ Check if products exist before filtering
            const bestProduct = products.filter((item) => item.bestseller); // ✅ Fixed "fliter" to "filter"
            setBestSeller(bestProduct.slice(0, 5));
        }
    }, [products]); // ✅ Added `products` as a dependency

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} /> {/* ✅ Fixed Title props */}
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate et sit animi cumque neque minus. Voluptate ad ducimus officiis dicta nihil, sed nesciunt unde cupiditate consequatur ut tenetur explicabo veniam!
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => ( // ✅ Removed typo in "bestSeller;;er"
                        <ProductItem key={index} id={item.id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div>
    );
}

export default BestSeller;
