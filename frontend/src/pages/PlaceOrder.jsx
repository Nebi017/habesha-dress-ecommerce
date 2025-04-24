import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [methode, setMethode] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   console.log("cartItems:", cartItems);
  //   try {
  //     let orderItems = [];
  //     for (const items in cartItems) {
  //       for (const item in cartItems[items]) {
  //         if (cartItems[items][item] > 0) {
  //           const itemInfo = structuredClone(
  //             products.find((product) => product._id === items)
  //           );

  //           if (itemInfo) {
  //             itemInfo.size = item;
  //             itemInfo.quantity = cartItems[items][item];
  //             orderItems.push(itemInfo);
  //           }
  //         }
  //       }
  //     }
  //     let orderData = {
  //       address: formData,
  //       items: orderItems,
  //       amount: getCartAmount() + delivery_fee,
  //     };

  //     switch (methode) {
  //       case "cod":
  //         const response = await axios.post(
  //           backendUrl + "/api/order/place",
  //           orderData,
  //           { headers: { token } }
  //         );
  //         console.log(response.data.success)
  //         if (response.data.success) {
  //           setCartItems({});
  //           navigate("/orders");
  //         } else {
  //           toast.error(response.data.message);
  //         }

  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (error) {}
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("[Debug] Form submitted");
    console.log("[Debug] cartItems:", cartItems);
    console.log("[Debug] formData:", formData);
    console.log("[Debug] payment method:", methode);
    console.log("[Debug] auth token:", token ? "exists" : "missing");

    try {
      // Validate essential data
      if (!cartItems || Object.keys(cartItems).length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      if (!formData || Object.keys(formData).length === 0) {
        toast.error("Shipping information is incomplete");
        return;
      }

      if (!methode) {
        toast.error("Payment method not selected");
        return;
      }

      // Process cart items
      let orderItems = [];

      for (const productId in cartItems) {
        const product = products.find((p) => p._id === productId);

        if (!product) {
          console.warn(`[Debug] Product not found: ${productId}`);
          continue;
        }

        // for (const size in cartItems[productId]) {
        //   const quantity = cartItems[productId][size];

        //   if (quantity > 0) {
        //     const itemInfo = structuredClone(product);
        //     itemInfo.size = size;
        //     itemInfo.quantity = quantity;
        //     orderItems.push(itemInfo);
        //   }
        // }
        for (const size in cartItems[productId]) {
          const entry = cartItems[productId][size];

          if (
            entry &&
            typeof entry === "object" &&
            "quantity" in entry &&
            entry.quantity > 0
          ) {
            const itemInfo = structuredClone(product);
            itemInfo.size = size;
            itemInfo.quantity = entry.quantity;

            if (entry.measurements) {
              itemInfo.measurements = entry.measurements;
            }

            orderItems.push(itemInfo);
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("No valid items in cart");
        return;
      }

      console.log("[Debug] Processed orderItems:", orderItems);

      // Calculate amounts properly
      const subtotal = getCartAmount();
      const deliveryFee = delivery_fee || 0; // Ensure delivery fee exists
      const total = Number(subtotal) + Number(deliveryFee);

      if (isNaN(total)) {
        console.error("[Error] Invalid amount calculation:", {
          subtotal,
          deliveryFee,
          total,
        });
        toast.error("Could not calculate order total");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: total,
        paymentMethod: methode,
      };

      console.log("[Debug] Final orderData:", orderData);

      // Handle different payment methods
      switch (methode.toLowerCase()) {
        case "cod":
          console.log("[Debug] Processing COD order");
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          console.log("[Debug] Backend response:", response.data);

          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Failed to place order");
          }
          break;

        default:
          toast.error(`Unsupported payment method: ${methode}`);
      }
    } catch (error) {
      console.error("[Error] Order submission failed:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[3vw]"
    >
      {/* Left Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-full">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Email address"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Section */}
      <div className="mt-10 ml-2 w-full">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        {/* Payment Methods */}
        <div className="mt-10 ">
          <Title text1={"PAYMENT"} text2={"METHODE"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              onClick={() => setMethode("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${
                  methode === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            {/* Razorpay */}
            {/* <div
              onClick={() => setMethode("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${
                  methode === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div> */}

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethode("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${
                  methode === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
