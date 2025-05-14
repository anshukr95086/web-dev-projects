import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburger = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav>
      <div className="relative flex justify-between items-center bg-purple-800/40 px-20 py-2 mx-3 rounded-lg mt-2">
        <div className="logo font-bold text-2xl flex items-center justify-center max-sm:w-full">
          <span className="text-purple-900">&lt;</span>
          <span className="text-white">Key</span>
          <span className="text-purple-900">Pouch/&gt;</span>
        </div>

        <ul
          className={`max-sm:z-10 max-sm:fixed transition-all duration-300 ${
            menuOpen ? "max-sm:right-10" : "max-sm:-right-40"
          }`}
        >
          <li className="flex gap-5 max-sm:flex-col">
            <a className="text-black" href="">
              Home
            </a>
            <a className="text-black" href="">
              About
            </a>
            <a className="text-black" href="">
              Conatct
            </a>
            <a className="text-black" href="">
              Help
            </a>
          </li>
        </ul>
        <div className="absolute right-6 top-3" onClick={handleHamburger}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 sm:hidden z-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
