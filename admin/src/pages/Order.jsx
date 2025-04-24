import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [expandedMeasurementIndex, setExpandedMeasurementIndex] =
    useState(null);
  const [expandedSizeIndex, setExpandedSizeIndex] = useState(null);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  // Function to update the order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data);
    }
  };

  // Function to handle the toggle of size details for each item
  const handleViewSize = (uniqueKey) => {
    setExpandedMeasurementIndex(
      expandedMeasurementIndex === uniqueKey ? null : uniqueKey
    );
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      {orders.map((order, index) => {
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {/* Loop through items and display each one with its details */}
                {order.items.map((item, itemIndex) => {
                  const uniqueKey = `${index}-${itemIndex}`;
                  return (
                    <div className="py-0.5" key={itemIndex}>
                      {item.name} X {item.quantity} <br />
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
                  );
                })}
              </div>
              {/* Displaying order address */}
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p>{order.address.street + ", "}</p>
              <p>
                {order.address.city +
                  ", " +
                  order.address.state +
                  ", " +
                  order.address.country +
                  ", " +
                  order.address.zipcode}
              </p>
              <div>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Displaying order summary */}
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3"> Method : {order.paymentMethod}</p>
              <p> Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Displaying the order amount */}
            <p className="text-sm sm:text-[15px]">
              {" "}
              {currency}
              {order.amount}
            </p>

            {/* Select for changing order status */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
