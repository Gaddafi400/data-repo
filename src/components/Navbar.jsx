import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
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
              <li>
                <Link to="/" className="nav-link" style={style}>
                  Data set
                </Link>
              </li>
              <li>
                <Link to={'./market-finder'} className="nav-link" style={style}>
                  Market Finder
                </Link>
              </li>
              <li>
                <span className="nav-link">Discover More</span>
                <ul className="p-2">
                  <li>
                    <Link to="/about" className="nav-link" style={style}>
                      About us
                    </Link>
                  </li>
                  <li className="nav-link" style={style}>
                    <Link to="/contact" className="nav-link">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/">
            <div className="flex flex-row items-center">
              <img src={logo} alt="Logo" className="cursor-pointer" />
              <Link
                to={'/'}
                className="normal-case text-white text-24 font-arial font-normal break-words px-3 cursor-pointer"
              >
                STEADY VARIABLE
              </Link>
            </div>
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="/"
                className="hover:text-white text-base nav-link"
                style={style}
              >
                Data set
              </Link>
            </li>
            <li>
              <Link
                to={'/market-finder'}
                className="text-base nav-link"
                style={style}
              >
                Market Finder
              </Link>
            </li>
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

export default Navbar;
