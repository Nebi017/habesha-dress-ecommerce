import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = `$`;
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // const addToCart = async (itemId, measurements) => {
  //   if (!measurements || Object.keys(measurements).length === 0) {
  //     toast.error("Enter all product measurements");
  //     return;
  //   }

  //   const sizeKey = Object.values(measurements).join("-");
  //   let cartData = structuredClone(cartItems);

  //   if (!cartData[itemId]) {
  //     cartData[itemId] = {};
  //   }

  //   if (cartData[itemId][sizeKey]) {
  //     cartData[itemId][sizeKey].quantity += 1;
  //   } else {
  //     cartData[itemId][sizeKey] = {
  //       quantity: 1,
  //       measurements,
  //     };
  //   }

  //   setCartItems(cartData);
  //   toast.success("Added to cart");

  //   if (token) {
  //     try {
  //       await axios.post(
  //         backendUrl + "/api/cart/add",
  //         {
  //           itemId,
  //           measurements,
  //         },
  //         {
  //           headers: { token },
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   }
  // };

  
   const addToCart = async (itemId, measurements) => {
    console.log("Measurements being sent:", measurements);
    if (
      measurements &&
      !Array.isArray(measurements) &&
      typeof measurements === "object"
    ) {
      measurements = Object.values(measurements);
    }

    if (!measurements || measurements.length === 0) {
      toast.error("Enter all product measurements");
      return;
    }

    const sizeKey = measurements
      .map((m) => Object.values(m).join("_")) // join individual measurement values
      .join("-"); // join all persons in the group

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][sizeKey]) {
      cartData[itemId][sizeKey].quantity += 1;
    } else {
      cartData[itemId][sizeKey] = {
        quantity: 1,
        measurements,
      };
    }

    setCartItems(cartData);
    toast.success("Added to cart");

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            measurements,
          },
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item].quantity > 0) {
            totalCount += cartItems[items][item].quantity;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, sizeKey, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    if (quantity === 0) {
      delete cartData[itemId][sizeKey];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][sizeKey].quantity = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, sizeKey, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item].quantity > 0) {
            totalAmount += itemInfo.price * cartItems[items][item].quantity;
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toString.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken); // use directly here instead of waiting for setToken
    }
  }, []);
  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
