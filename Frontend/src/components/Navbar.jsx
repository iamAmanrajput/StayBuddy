import React, { useState } from "react";
import { Link } from "react-router-dom";
import bhootLogo from "../assets/bhoot-logo.png";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { SlLogin } from "react-icons/sl";
import { CgLogIn } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu visibility for small screens
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="max-w-full bg-gray-900 text-white">
      <nav className="w-full flex h-16 justify-between items-center px-4 sm:px-8 mx-auto">
        {/* Logo */}
        <Link to="/" className="h-full flex items-center space-x-2">
          <img
            src={bhootLogo}
            alt="logo"
            className="h-[80%] opacity-70 hover:opacity-100"
          />
          <p className="text-xl font-bold text-golden opacity-70 hover:opacity-100">
            StayBuddy
          </p>
        </Link>

        {/* Hamburger Icon and Menu */}
        <div className="flex items-center">
          {/* Hamburger Icon (visible on small screens) */}
          <RxHamburgerMenu
            className="text-2xl font-bold text-golden cursor-pointer sm:hidden"
            onClick={toggleMenu}
          />

          {/* Menu Items */}
          <div
            className={`flex flex-col  gap-4 items-start sm:items-center absolute sm:static top-16 sm:top-auto left-0 w-full bg-gray-900 sm:bg-transparent sm:flex sm:flex-row  p-4 sm:p-0 transition-all duration-300 ease-in-out ${
              isOpen ? "block" : "hidden sm:block"
            }`}
          >
            {/* Add Your Listing Button (now part of the hamburger menu on small screens) */}
            <Link
              to="/add-listing"
              className="border-2 px-4 py-1 rounded-2xl border-golden font-bold opacity-70 hover:opacity-100 text-golden flex items-center gap-2"
            >
              <MdOutlineAddHomeWork className="text-xl font-bold" />
              <p>Add Your Listing</p>
            </Link>

            {/* Login Link */}
            <Link
              to="/login"
              className="border-2 px-4 py-1 rounded-2xl border-golden font-bold opacity-70 hover:opacity-100 flex items-center gap-2 text-golden"
            >
              <SlLogin />
              <p>Login</p>
            </Link>

            {/* Signup Link */}
            <Link
              to="/signup"
              className="border-2 px-4 py-1 rounded-2xl border-golden font-bold opacity-70 hover:opacity-100 flex items-center gap-2 text-golden"
            >
              <CgLogIn />
              <p>Signup</p>
            </Link>
            {/* <Link
              to="/logout"
              className="border-2 px-4 py-1 rounded-2xl border-golden font-bold opacity-70 hover:opacity-100 flex items-center gap-2 text-golden"
            >
              <GrLogout />
              <p>Signup</p>
            </Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
