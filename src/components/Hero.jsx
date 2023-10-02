import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Category from './Category';
import { useGlobalContext } from '../context';
import { customFetch } from '../utils';

const url = '/guest/search/';

const Hero = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const { setIsLoading, setSearchData } = useGlobalContext();
  const { categories, datasets } = useLoaderData();
  const navigate = useNavigate();

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

  const handleButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="hero">
      <div className="search-container">
        <h1>Enhancement through Data Insights</h1>
        <p>
          Comprehensive Data and Knowledge Spanning 36 States and Over 774 Local
          Government in Nigeria
        </p>

        <form className="search-form">
          <select
            className="select select-bordered text-base lg:text-lg xl:text-xl"
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <option disabled value="">
              Find your
            </option>

            {/* Map categories to select options */}
            {datasets?.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>

          <button className="rounded-xl text-white" onClick={handleSearchBtn}>
            search
          </button>
        </form>
        <div className="category">
          {/* Render Category components here */}
          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.name}
              handleClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
