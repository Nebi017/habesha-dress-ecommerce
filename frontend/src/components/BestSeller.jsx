import React, { useContext, useEffect, useState } from "react"; // ✅ Added useState import
import { ShopContext } from "../context/ShopContext"; // ✅ Corrected import path
import Title from "./Title";
import ProductItem from "./ProductItem";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    console.log("All products:", products);

    if (products && products.length > 0) {
      // ✅ Check if products exist before filtering
      const bestProduct = products.filter((item) => item.bestSeller); // ✅ Fixed "fliter" to "filter"
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]); // ✅ Added `products` as a dependency
  console.log(bestSeller);
  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} /> {/* ✅ Fixed Title props */}
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Handwoven – Soft, Lightweight, and Perfectly Crafted
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map(
          (
            item,
            index // ✅ Removed typo in "bestSeller;;er"
          ) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          )
        )}
      </div>
    </div>
  );
}

export default BestSeller;
