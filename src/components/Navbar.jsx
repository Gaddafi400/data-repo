import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ isMarketFinder }) => {
  const style = { background: '#292949', color: 'white' };

  return (
    <div className="bg-primary-500 text-white nav">
      <div className="navbar lg:align-element">
        <div className="mobile-nav navbar-start">
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
              {isMarketFinder && (
                <li>
                  <Link to="/" className="nav-link" style={style}>
                    Data Repo
                  </Link>
                </li>
              )}

              {!isMarketFinder && (
                <li>
                  <Link to="/market-finder" className="nav-link" style={style}>
                    Market Finder
                  </Link>
                </li>
              )}

              <li>
                <span className="nav-link" style={style}>
                  Discover More
                </span>
                <ul className="p-2">
                  <li>
                    <Link to="/about" className="nav-link" style={style}>
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="nav-link" style={style}>
                      Contact us
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="normal-case flex flex-row items-center text-white text-24 font-arial font-normal break-words px-3 cursor-pointer"
          >
            <img src={logo} alt="Logo" className="cursor-pointer" />
            STEADY VARIABLES
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {isMarketFinder && (
              <li>
                <Link
                  to="/"
                  className="hover:text-white text-base nav-link"
                  style={style}
                >
                  Data Repo
                </Link>
              </li>
            )}

            {!isMarketFinder && (
              <li>
                <Link
                  to="/market-finder"
                  className="text-base nav-link"
                  style={style}
                >
                  Market Finder
                </Link>
              </li>
            )}

            <li tabIndex={0}>
              <details>
                <summary
                  className="hover:text-white text-base nav-link"
                  style={style}
                >
                  Discover More
                </summary>
                <ul className="p-2 bg-primary-500">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-white text-base nav-link"
                      style={style}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-white text-base nav-link"
                      style={style}
                    >
                      Contact Us
                    </Link>
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

Navbar.propTypes = {
  isMarketFinder: PropTypes.bool,
};

export default Navbar;
