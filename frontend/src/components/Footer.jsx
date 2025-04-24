import React from "react";
import logo from "../assets/log0.jpg";
import line from "../assets/line.jpg";

function Footer() {
  return (
    <div>
      {/* Main content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-3 sm:px-[5vw] md:px-[4vw] lg:px-[9vw]">
        <div>
          <img src={logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w/2/3 text-gray-600">
            Welcome back! Sign in to your account to continue where you left
            off. Secure, fast, and easy access to your personalized experience.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+251935701691</li>
            <li>Jedid@gmail.com</li>
          </ul>
        </div>
      </div>
      <p className=" border w-full border-gray-100"></p>

      {/* Copyright section with images on both sides */}
      <div className="flex items-center justify-center w-full bg-white py-5">
        {/* Left line image */}
        {/* Copyright text in the center */}
        <p className="text-sm py-1  h-7 mx-4 ">
          Copyright 2025@ JEDID.com - ALL Right Reserved
        </p>

        {/* Right line image */}
      </div>
      <img className="w-full mt-0.5" src={line} alt="Line" />
    </div>
  );
}

export default Footer;
