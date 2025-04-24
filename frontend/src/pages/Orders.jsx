import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Missing import
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [expandedMeasurementIndex, setExpandedMeasurementIndex] = useState(null);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("No token available");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };
  const handleViewSize = (index) => {
    setExpandedMeasurementIndex(
      expandedMeasurementIndex === index ? null : index
    );
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Rest of your component...
  return (
    <div className="border-t pt-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[5vw] ">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-600">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity : {item.quantity}</p>
                </div>
                <p className="mt-1">
                  Date :{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment :{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
                <button
                  onClick={() => handleViewSize(index)}
                  className="text-xs text-white hover:text-white mt-1 border-4 bg-black p-2"
                >
                  VIEW SIZE
                </button>
                <br />
                {expandedMeasurementIndex === index && item.measurements && (
                  <div className="mt-2 text-xs bg-gray-100 p-2 rounded">
                    {Object.entries(item.measurements).map(([key, value]) => (
                      <p key={key} className="text-gray-600">
                        {`${key.toUpperCase()}: ${value} cm`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Order {item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
