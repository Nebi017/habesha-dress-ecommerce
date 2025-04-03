import { createContext, useState } from "react";
import { products } from "../assets/assets.js"; // Ensure correct path

export const ShopContext = createContext(); // ✅ Correctly exported

const ShopContextProvider = ({ children }) => {
    const currency = `$`;
    const deliveryFee = 10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch] =useState(false)


    const value = { products, currency,deliveryFee,search,setSearch,showSearch,setShowSearch }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider; // ✅ Default export for provider
