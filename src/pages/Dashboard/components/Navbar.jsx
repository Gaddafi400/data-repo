import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
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

            {/* <div className="flex justify-between px-2">
              <span>Dashboard</span>
              <AiIcons.AiFillHome />
            </div> */}

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

            {/* <Dropdown
              label="Commodities"
              items={['Maize', 'Rice', 'Millets']}
            /> */}

            {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
