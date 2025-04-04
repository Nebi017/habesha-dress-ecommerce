import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title'; // Import Title component
import ProductItem from './ProductItem'; // Import ProductItem component

function RelatedProducts({ category, subCategory }) {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter(
                (item) => item.category === category && item.subCategory === subCategory
            );

            setRelated(productCopy.slice(0, 5)); // Update state with filtered products
        }
    }, [products, category, subCategory]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item.id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
