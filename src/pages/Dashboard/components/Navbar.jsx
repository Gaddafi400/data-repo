import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Dropdown } from '../../../components';
import UserProfile from './UserProfile';
import logo from '../../../assets/logo.png';
import { removeUserFromLocalStorage } from '../../../utils';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeLink = (path) => {
    return location.pathname === path ? 'selected-nav' : '';
  };

  const showSidebar = (e) => {
    e.preventDefault();
    return setSidebar(!sidebar);
  };
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const categoryClick = (e) => {
    // showSidebar();
    activeLink();
    if (e.target.id.toLowerCase() === 'state') {
      navigate('/dashboard/state');
    } else if (e.target.id.toLowerCase() === 'town') {
      navigate('/dashboard/town');
    } else {
      navigate('/dashboard/local-govt');
    }
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
            <button
              onClick={toggleProfile}
              className="text-white bg-primary-700 hover:bg-primary-800 p-2 rounded-lg px-6"
            >
              Profile
            </button>

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
                onClick={() => navigate('/dashboard/')}
                className="bg-white admin-logo cursor-pointer"
                src={logo}
                alt="logo"
                size="300"
              />
            </li>

            <button
              style={{ paddingRight: '130px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2  ${activeLink(
                '/dashboard/'
              )}`}
              onClick={() => navigate('/dashboard/')}
            >
              DashBoard
            </button>

            <div className="mt-2">
              <Dropdown
                label="Municipal"
                items={['State', 'Local Govt', 'Town']}
                onClick={(e) => categoryClick(e)}
              />
            </div>

            <button
              style={{ paddingRight: '112px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2  ${activeLink(
                '/dashboard/commodity'
              )}`}
              onClick={() => navigate('/dashboard/commodity')}
            >
              Commodities
            </button>

            <button
              style={{ paddingRight: '155px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2  ${activeLink(
                '/dashboard/market'
              )}`}
              onClick={() => navigate('/dashboard/market')}
            >
              Markets
            </button>

            <button
              style={{ paddingRight: '170px' }}
              className={`mt-2 text-white px-5 rounded-lg p-2  ${activeLink(
                '/dashboard/users'
              )}`}
              onClick={() => navigate('/dashboard/users')}
            >
              Users
            </button>
          </ul>
        </nav>
      </IconContext.Provider>
      {/* User profile */}
      {showProfile ? <UserProfile onClose={toggleProfile} /> : ''}
    </>
  );
};

export default Navbar;
