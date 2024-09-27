import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {

  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-gray-200 dark:bg-gray-900 bg-[#00b5fd]">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to="/">
        <span className="self-center text-2xl hover:text-white font-semibold whitespace-nowrap dark:text-black text-black">
          Personal Blogging App
        </span>
      </Link>
  
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-black rounded-lg md:hidden hover:bg-text-black focus:outline-none focus:ring-2 focus:ring-text-black dark:text-black dark:hover:bg-text-black dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
  
      <div
        className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              to="/dashboard"
            >
              DashBoard
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              to="/register"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;

