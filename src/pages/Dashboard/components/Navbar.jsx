import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Dropdown } from '../../../components';
import logo from '../../../assets/logo.png';
import { removeUserFromLocalStorage } from '../../../utils';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(true);
  const navigate = useNavigate();

  const showSidebar = (e) => {
    e.preventDefault();
    return setSidebar(!sidebar);
  };

  const categoryClick = (e) => {
    // showSidebar();
    if (e.target.id.toLowerCase() === 'state') {
      navigate('/dashboard/state');
    } else if (e.target.id.toLowerCase() === 'town') {
      navigate('/dashboard/town');
    } else {
      navigate('/dashboard/town');
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

        {/* sidebar {`nav-menu active ${sidebar ? 'nav-menu.active' : ''}`} */}
        <nav className={`nav-menu ${sidebar ? 'active' : ''}`}>
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
                className="bg-white admin-logo"
                src={logo}
                alt="logo"
                size="300"
              />
            </li>

            <Dropdown
              label="Municipal"
              items={['State', 'Local Govt', 'Town']}
              onClick={(e) => categoryClick(e)}
            />

            <button
              style={{ paddingRight: '112px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
              onClick={() => navigate('/dashboard/commodity')}
            >
              Commodities
            </button>

            <button
              style={{ paddingRight: '155px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
              onClick={() => navigate('/dashboard/market')}
            >
              Markets
            </button>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
