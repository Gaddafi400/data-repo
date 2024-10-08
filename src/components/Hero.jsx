import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Category from './Category';
import SearchableSelect from './SearchableSelect';

import { useGlobalContext } from '../context';
import { customFetch } from '../utils';

const url = '/guest/search/';

const Hero = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const { setIsLoading, setSearchData, setTopSearch, setKnowledge } =
    useGlobalContext();
  const { categories, datasets, knowledge, topSearch } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    setTopSearch(topSearch);
    setKnowledge(knowledge);
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

  const handleCategoryClick = async (e, id) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const queryParams = { dataCategory: id };
      const response = await customFetch(url, { params: queryParams });

      setSearchData({
        results: response.data?.data.data,
      });
      navigate('./search-results');
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero" id="hero">
      <div className="search-container">
        <h1 className="text-slate-800 text-center text-2xl sm:text-4xl">
          Data, Knowledge, Insights all in one place{' '}
        </h1>
        <p className="text-slate-800 text-center text-xl sm:text-2xl">
          Comprehensive Data and Knowledge Spanning 36 States and Over 774 Local
          Government in Nigeria
        </p>

        <div className="flex flex-col gap-4 py-12 px-4">
          <SearchableSelect options={datasets} />
          <div className="category">
            {categories.map((category) => (
              <Category
                key={category.id}
                title={category.name}
                handleClick={(e) => handleCategoryClick(e, category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
