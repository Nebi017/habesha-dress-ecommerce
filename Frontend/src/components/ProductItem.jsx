import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price }) {
    const { currency } = useContext(ShopContext);

    return (
        <div>
            <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
                <div className='overflow-hidden'>
                    {/* Ensure image exists before accessing index 0 */}
                    <img 
                        className='hover:scale-110 transition ease-in-out' 
                        src={Array.isArray(image) && image.length > 0 ? image[0] : "/fallback.jpg"} 
                        alt={name || "Product Image"} 
                    />
                </div>
                <p className='pt-3 pb-1 text-sm'>{name}</p>
                <p className='text-sm font-medium'>{currency}{price}</p>
            </Link>
        </div>
    );
}

export default ProductItem;
