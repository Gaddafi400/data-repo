import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className="bg-primary-500  text-white">
      <div className="navbar lg:align-element">
        <div className="mobile-nav navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary-500 rounded-box w-52"
            >
              <li>
                <a>Data set</a>
              </li>
              <li>
                <a>Market Finder</a>
              </li>
              <li>
                <a>Discover More</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="flex flex-row items-center">
            <img src={logo} alt="Logo" className="cursor-pointer" />
            <a className="normal-case text-white text-24 font-arial font-normal break-words px-3 cursor-pointer">
              STEADY VARIABLE
            </a>
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="hover:text-white text-base">Data set</a>
            </li>
            <li>
              <a className="hover:text-white text-base">Market Finder</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary className="hover:text-white text-base">
                  Discover More
                </summary>
                <ul className="p-2 bg-primary-500">
                  <li>
                    <Link to="./about" className="hover:text-white text-base">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a className="hover:text-white text-base">Contact Us</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
