import { useState } from 'react';

const Dropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <li>
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group nav-link`}
        aria-controls="dropdown-example"
        onClick={toggleDropdown}
      >
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          Commodities
        </span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <ul id="dropdown-example" className="py-2 space-y-2">
          <li className="nav-link">
            <button className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group">
              Maize
            </button>
          </li>
          <li className="nav-link">
            <button className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group">
              Rice
            </button>
          </li>
          <li className="nav-link">
            <button className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group">
              Millets
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
