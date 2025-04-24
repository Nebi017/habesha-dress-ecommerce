import React from "react";
import assets from "../assets/assets";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex item-center py-2 px-[4%] justify-between ">
      <img className="w-[max(5%,40px)]" src={assets.logo} alt="" />
      <div className="mt-6">
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-7 py-2 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
