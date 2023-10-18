import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import '../../Dashboard/components/Navbar.css';
import { IconContext } from 'react-icons';

import { Dropdown } from '../../../components';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  console.log('showSidebar', sidebar);

  const categoryClick = (e) => {
    showSidebar();
    if (e.target.id.toLowerCase() === 'state') {
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
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
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
