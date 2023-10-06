import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Category from './Category';
import SearchableSelect from './SearchableSelect';

import { useGlobalContext } from '../context';
import { customFetch } from '../utils';

const url = '/guest/search/';

const Hero = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const { setIsLoading, setSearchData, setTopSearch } = useGlobalContext();
  const { categories, datasets, topSearch } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    setTopSearch(topSearch);
  });

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSearchBtn = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const queryParams = { datasets: selectedValue };
      const response = await customFetch(url, { params: queryParams });

      setSearchData({
        topSearch: response.data?.data.topsearch,
        results: response.data?.data.data,
      });
      setIsLoading(false);
      navigate('./search-results');
    } catch (error) {
      // Handle any errors here
      console.error('API Error:', error);
    }
  };

  const handleCategoryClick = async (id) => {
    setIsLoading(true);
    try {
      const queryParams = { dataCategory: id };
      const response = await customFetch(url, { params: queryParams });

      setSearchData({
        results: response.data?.data.data,
      });
      setIsLoading(false);
      navigate('./search-results');
    } catch (error) {
      // Handle any errors here
      console.error('API Error:', error);
    }
  };

  return (
    <div className="hero">
      <div className="search-container">
        <h1>Data, Knowledge, Insights all in one place </h1>
        <p>
          Comprehensive Data and Knowledge Spanning 36 States and Over 774 Local
          Government in Nigeria
        </p>

        <div className="flex flex-col gap-4 py-4 px-4">
          <SearchableSelect options={datasets} />
          <div className="category">
            {categories.map((category) => (
              <Category
                key={category.id}
                title={category.name}
                handleClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
