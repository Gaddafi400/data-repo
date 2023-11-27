import { useState } from 'react';
import PropTypes from 'prop-types';
import { customFetchMarket, capitalizeFirstLetter } from '../utils';

const FinderSidebar = ({ items, updateMarkets, paramsObj }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const handleCommodityClick = async (e) => {
  //   e.preventDefault();
  //   const url = '/guest/';

  //   console.log('paramsObj', paramsObj);
  //   // setLoading(true);
  //   const params = {
  //     state: paramsObj?.state,
  //     town: paramsObj?.town,
  //     lga: paramsObj?.lga,
  //     selectedDay: paramsObj?.selectedDay,
  //     commodity: e.target.id,
  //   };

  //   try {
  //     const response = await customFetchMarket.get(url, { params });
  //     console.log(response.data.data);
  //     const { commodities, markets } = response.data.data;
  //     updateMarkets(markets);
  //   } catch (error) {
  //     return error;
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const handleCommodityClick = async (e) => {
    e.preventDefault();
    const url = '/guest/';

    const commodityId = e.target.id;

    const params = {
      state: paramsObj?.state,
      town: paramsObj?.town,
      lga: paramsObj?.lga,
      selectedDay: paramsObj?.selectedDay,
      commodity: commodityId,
    };

    try {
      const response = await customFetchMarket.get(url, { params });
      const { commodities, markets } = response.data.data;
      updateMarkets(markets);

      // Set the active category
      setActiveCategory(commodityId);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <aside className="mfinder-sidebar" aria-label="Sidebar">
        <li>
          <button
            type="button"
            className={`flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group nav-link ${
              isDropdownOpen ? 'selected-nav' : ''
            }`}
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
              {items.map((item, index) => (
                <li key={index} className="nav-link">
                  <button
                    id={item?.id}
                    onClick={handleCommodityClick}
                    className={`flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-8 group ${
                      activeCategory === item?.id ? 'bg-primary-800' : ''
                    }`}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </aside>
    </>
  );
};

FinderSidebar.propTypes = {
  items: PropTypes.array,
  paramsObj: PropTypes.object,
  updateMarkets: PropTypes.func,
};

export default FinderSidebar;
