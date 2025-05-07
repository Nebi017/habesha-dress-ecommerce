import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ShopContextProvider from "./context/ShopContext"; // Ensure correct import path

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>  {/* Wrap the App with context provider */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
