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

{/* logo start */}

        <Link to="/">
          <span className="self-center text-2xl hover:text-white font-semibold whitespace-nowrap dark:text-black text-black">
            Personal Blogging App
          </span>
        </Link>


{/* logo end */}


{/* hamburger start */}

        <label className="btn-circle bg-[#00b5fd] swap swap-rotate md:hidden">
  <input onClick={toggleMenu} type="checkbox" />
  <svg
    className="swap-off fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
  </svg>
  <svg
    className="swap-on fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <polygon
      points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
  </svg>
</label>

{/* hamburger end */}


{/* navbar links start */}

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
            <li>
              <Link
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                to="/logout"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>


{/* navbar links end */}

      </div>
    </nav>
  );
};

export default Navbar;
