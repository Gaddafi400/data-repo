import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGlobalContext } from '../context';
import { customFetch } from '../utils';

const URL = '/guest/search/';

const fetchData = async (searchTerm) => {
  try {
    const queryParams = { search: searchTerm };
    const response = await customFetch(URL, { params: queryParams });
    return {
      topSearch: response.data?.data.topsearch,
      results: response.data?.data.data,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const SearchableSelect = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState('');

  //   const [selectedOption, setSelectedOption] = useState(null);

  const { setIsLoading, setSearchData } = useGlobalContext();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = async (e, option) => {
    e.preventDefault();
    try {
      setSearchTerm(option.name);
      setIsLoading(true);
      const searchData = await fetchData(option.name);
      setSearchData(searchData);
      setIsLoading(false);
      setSearchTerm('');
      navigate('./search-results');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearchBtn = async () => {
    try {
      if (!searchTerm) {
        toast.warning('Please enter a search term to begin your search.');
        return;
      }
      setIsLoading(true);
      const searchData = await fetchData(searchTerm);
      setSearchData(searchData);
      setIsLoading(false);
      setSearchTerm('');
      navigate('./search-results');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchData({
          results: [],
        });
        setIsLoading(false);
        setSearchTerm('');
        navigate('./search-results');
      } else {
        toast.error(error.message);
      }
    }
  };

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchable-select w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={searchTerm}
          onChange={handleInputChange}
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-600 focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mining, Energy..."
          required
        />
        <button
          onClick={handleSearchBtn}
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-footer hover:bg-fth focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      {searchTerm && (
        <ul className="suggestions bg-primary-500 text-white">
          {filteredOptions.map((option) => (
            <li
              className="suggestion"
              key={option.id}
              onClick={(e) => handleOptionClick(e, option)}
            >
              {option.name.length > 50
                ? option.name.slice(0, 100) + '...'
                : option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchableSelect.propTypes = {
  options: PropTypes.array.isRequired,
};

export default SearchableSelect;
