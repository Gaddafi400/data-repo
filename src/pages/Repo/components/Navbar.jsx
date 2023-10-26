import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../Dashboard/components/Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../../assets/logo.png';
import { removeUserFromLocalStorage } from '../../../utils';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const showSidebar = (e) => {
    e.preventDefault();
    return setSidebar(!sidebar);
  };

  const activeLink = (path) => {
    return location.pathname === path ? 'selected-nav' : '';
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        {/* navbar */}
        <div className="admin-navbar flex justify-between items-center p-5">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <div className="flex space-x-4">
            {/* Profile Link */}
            <Link
              to="/profile"
              className="text-white bg-primary-700 hover:bg-primary-800 p-2 rounded-lg px-6"
            >
              Profile
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                removeUserFromLocalStorage();
                navigate('/login');
              }}
              className="bg-red-500 text-white p-2 px-6 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
        {/* end nav */}

        {/* <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
         */}
        <nav className={`nav-menu p-2 ${sidebar ? 'active' : ''}`}>
          <ul className="nav-menu-items">
            {/* hide on large screen */}
            <li className="navbar-toggle">
              <Link
                to="#"
                className="menu-bars ml-12 toggle-icon"
                onClick={showSidebar}
              >
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {/* display on large screen */}
            <li className="px-12 pt-2 mb-3">
              <img
                className="bg-white admin-logo cursor-pointer"
                src={logo}
                alt="logo"
                size="300"
                onClick={() => navigate('/repo')}
              />
            </li>

            <button
              style={{ paddingRight: '133px' }}
              className={`mt-2 text-white px-5 rounded-lg p-3  ${activeLink(
                '/repo'
              )}`}
              onClick={() => navigate('/repo')}
            >
              Dashboard
            </button>

            <button
              style={{ paddingRight: '148px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2 ${activeLink(
                '/repo/variable'
              )}`}
              onClick={() => navigate('/repo/variable')}
            >
              Variables
            </button>

            <button
              style={{ paddingRight: '134px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2  ${activeLink(
                '/repo/categories'
              )}`}
              onClick={() => navigate('/repo/categories')}
            >
              Categories
            </button>

            <button
              style={{ paddingRight: '112px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2 ${activeLink(
                '/repo/common-knowledge'
              )}`}
              onClick={() => navigate('/repo/common-knowledge')}
            >
              C-Knowledge
            </button>

            <button
              style={{ paddingRight: '150px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2 ${activeLink(
                '/repo/dataset'
              )}`}
              onClick={() => navigate('/repo/dataset')}
            >
              Data Set
            </button>

            {/* <button
              style={{ paddingRight: '112px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
              onClick={() => navigate('/repo/operation')}
            >
              Operations
            </button> */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
