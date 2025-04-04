import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets.js"; // Ensure correct path
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


export const ShopContext = createContext(); // ✅ Correctly exported

const ShopContextProvider = ({ children }) => {
    const currency = `$`;
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); 

    const addToCart = async (itemId, size) => { // ✅ Fixed arrow function syntax
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        let cartData = structuredClone(cartItems); // ✅ Fixed variable name typo

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // ✅ Fixed increment syntax
            } else {
                cartData[itemId][size] = 1; // ✅ Initialize size entry
            }
        } else {
            cartData[itemId] = {}; // ✅ Initialize object
            cartData[itemId][size] = 1; // ✅ Assign size quantity
        }

        setCartItems(cartData); // ✅ Update state
    };

    const getCartCount = () => { // Fixed syntax for the function declaration
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error); // Log any error that occurs in the nested loop
                }
            }
        }
        return totalCount;
    };

    const value = { products, currency, deliveryFee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider; // ✅ Default export
