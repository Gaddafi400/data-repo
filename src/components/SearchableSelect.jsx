import React, { useState } from 'react';

const SearchableSelect = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    console.log('searchTerm 💥', searchTerm);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.label); // Display the selected option in the input
    console.log('value ', option.value);
    console.log('selectedOption ', selectedOption);

    // try {
    //   const response = await fetch(`/api/your-api-endpoint/${option.value}`);
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('API Response:', data);
    //     // Handle the API response data as needed
    //   } else {
    //     console.error('API Request Failed');
    //   }
    // } catch (error) {
    //   console.error('API Request Error:', error);
    // }
  };

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchable-select w-full">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
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
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-footer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      {searchTerm && (
        <ul className="suggestions">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`suggestion ${
                option === selectedOption ? 'selected' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
