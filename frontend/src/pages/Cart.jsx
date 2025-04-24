import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartItems, products, currency, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [expandedSizeIndex, setExpandedSizeIndex] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
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
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[5vw]">
      <div className="text-2xl mb-3">
        <Title text1="Your" text2="Cart" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const product = products.find((product) => product._id === item._id);
          if (!product) return <p key={index}>Product not found</p>;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={
                    Array.isArray(product.image)
                      ? product.image[0]
                      : product.image
                  }
                  alt={product.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {product.price}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedSizeIndex(
                        index === expandedSizeIndex ? null : index
                      )
                    }
                    className="text-xs text-white hover:text-whit mt-1 border-4 bg-black p-2"
                  >
                    VIEW SIZE
                  </button>
                  {expandedSizeIndex === index && (
                    <div className="mt-2 text-xs bg-gray-100 p-2 rounded">
                      {Array.isArray(item.measurements) ? (
                        item.measurements.map((measurement, mIndex) => (
                          <div key={mIndex} className="mb-2">
                            {typeof measurement === "object" &&
                            measurement !== null ? (
                              <>
                                {"gender" in measurement && (
                                  <p className="text-gray-600 font-semibold">
                                    Gender: {measurement.gender}
                                  </p>
                                )}
                                {Object.entries(measurement)
                                  .filter(([key]) => key !== "gender")
                                  .map(([key, value]) => (
                                    <p key={key} className="text-gray-600">
                                      {`${key.toUpperCase()}: ${value} cm`}
                                    </p>
                                  ))}
                              </>
                            ) : (
                              // Primitive measurement like "10" or "20"
                              <p className="text-gray-600">{`${measurement} cm`}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No measurement data</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.sizeKey,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.sizeKey, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
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
