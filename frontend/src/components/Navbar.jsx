import React, { useContext, useState } from "react"; // Add useState import
import logo from "../assets/logoo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import searchIcon from "../assets/search.png";
import profile_icon from "../assets/profile_icon.png";
import cart from "../assets/cart.png";
import menuIcon from "../assets/menuIcon.png";
import back from "../assets/back.png";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    navigate,
    token,
    setToken,
    setCartItems,
    getCartCount,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium p-5">
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-12 sm:w-20 md:w-24 h-17 object-contain"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right Section (Search, Profile, Cart) */}
      <div className="flex items-center gap-6">
        <Link to="/collection">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
        </Link>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-13 min-w-5"
            src={profile_icon}
            alt="Profile"
          />

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 bg-slate-100 text-gray-500 rounded-lg p-4">
                <p className="cursor-pointer hover:text-black ">My Profile</p>

                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Order
                </p>

                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={menuIcon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img className="h-4" src={back} alt="Back" />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
