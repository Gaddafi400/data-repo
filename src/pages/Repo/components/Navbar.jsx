import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import '../../Dashboard/components/Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../../assets/logo.png';
import { Dropdown } from '../../../components';
import { removeUserFromLocalStorage } from '../../../utils';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(true);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  console.log('showSidebar', sidebar);

  const categoryClick = (e) => {
    showSidebar();
    if (e.target.id.toLowerCase() === 'index') {
      navigate('/dashboard/state');
    } else if (e.target.id.toLowerCase() === 'town') {
      navigate('/dashboard/town');
    } else {
      navigate('/dashboard/default');
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

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
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

            <button
              style={{ paddingRight: '148px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
              onClick={() => navigate('/repo/variable')}
            >
              Variables
            </button>

            <button
              style={{ paddingRight: '140px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
              onClick={() => navigate('/repo/categories')}
            >
              Categories
            </button>

            <button
              style={{ paddingRight: '112px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
              onClick={() => navigate('/repo/common-knowledge')}
            >
              C-Knowledge
            </button>

            <button
              style={{ paddingRight: '150px' }}
              className="mt-2 text-white hover:bg-primary-700 px-5 rounded-lg p-3"
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
