import { createContext } from "react";
import { products } from "../assets/assets.js"; // Ensure correct path

export const ShopContext = createContext(); // ✅ Correctly exported

const ShopContextProvider = ({ children }) => {
    const currency = `$`;
    const deliveryFee = 10;

    const value = { products, currency, deliveryFee };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider; // ✅ Default export for provider
