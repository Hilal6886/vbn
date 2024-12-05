import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaPhoneAlt, FaImages } from "react-icons/fa";

const DentalClinicNavbar = () => {
  const [open, setOpen] = useState(false);
  const userData = localStorage.getItem("USER");
  const currentUser = userData ? JSON.parse(userData) : null;

  const menuItems = [
    { name: "Home", to: "/", icon: <FaHome /> },
    { name: "About Us", to: "/aboutus", icon: <FaInfoCircle /> },
    { name: "Contact", to: "/contact", icon: <FaPhoneAlt /> },
    { name: "Gallery", to: "/gallery", icon: <FaImages /> },
  ];

  const logout = async () => {
    try {
      localStorage.removeItem("USER");
      window.location.reload();
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  return (
    <nav className="bg-black text-white dark:bg-gray-900 border-b dark:border-gray-600 fixed top-0 w-full z-20">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
          
            <div>
              <p className="text-lg font-bold text-green-600">Dentelo</p>
              
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="text-white gap-5  text-center text-90 hover:text-green-600 flex font-medium uppercase"
              >
                
{item.icon}
{item.name}
              </Link>
            </li>
          ))}
          <li>
            {currentUser ? (
              <button
                onClick={logout}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="auth/sign-in"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className="text-3xl text-green-500 md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden fixed top-0 left-0 w-3/4 bg-[#000000] text-white dark:bg-gray900 h-full overflow-y-auto transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4">
          <li className="border-b">
            <img
              className="w-12 h-12 rounded-full"
              src={currentUser?.photoURL || "/avatar.png"}
              alt="User"
            />
            <span className="block mt-2 text-gray-600">
              {currentUser?.displayName || "Guest"}
            </span>
          </li>
          {menuItems.map((item, index) => (
            <li key={index} className="border-b">
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 p-4 hover:bg-gray-100"
              >
                <div className="bg-green-500 text-white p-2 rounded-full">
                  {item.icon}
                </div>
                <span className="uppercase font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
          <li className="p-4">
            {currentUser ? (
              <button
                onClick={logout}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="auth/login"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Sign In
              </Link>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default DentalClinicNavbar;
