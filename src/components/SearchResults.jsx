import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SearchCard from './SearchCard';
import Pagination from './Pagination';
import SubscribeRight from './SubscribeRight';
import TopSearch from './TopSearch';

import notFound from '../assets/404.png';

import { customFetch } from '../utils';

const SearchResults = ({ searchData, topSearch }) => {
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages based on data length and itemsPerPage
  const totalPages = Math.ceil(searchData.length / itemsPerPage);

  // Function to slice data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return searchData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleClick = () => {
    console.log('click');
  };

  const handleSubscribe = async (e, email) => {
    e.preventDefault();
    const url = '/guest/newsletter';

    try {
      const response = await customFetch.post(url, { email });
      console.log('response ', response);

      if (response.data?.responseCode === 201) {
        toast.success('Thank you for subscribing!');
      } else {
        toast.error('Failed to subscribe. Please try again later.');
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data?.data[0]);
      } else {
        toast.error(error.message);
      }
    }
  };

  const test = getCurrentPageData();
  console.log('test', test);

  return (
    <div className="search-parent">
      <div className="py-20 px-2 search-container text-black">
        {getCurrentPageData().length !== 0 ? (
          <div>
            <h3 className="text-lg lg:text-xl xl:text-2xl">
              We&apos;ve found{' '}
              <span className="font-semibold">{searchData.length}</span> Results
            </h3>
            {getCurrentPageData().map((result, _) => (
              <SearchCard
                key={result.id}
                heading={result.name}
                description="remove a person even though it’s the only component that will use it. we have no way to access it until it goes through this drilling"
                handleClick={handleClick}
              />
            ))}
            {/* only show pagination if search data > itemsPerPage */}
            {searchData.length >= itemsPerPage ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              ''
            )}
            {/*  */}
          </div>
        ) : (
          <img
            src={notFound}
            alt="404"
            className="object-cover md:w-[978px] md:h-[780px] w-full h-auto mt-0"
          />
        )}

        <div className="search-container-right">
          <SubscribeRight handleSubscribe={handleSubscribe} />
          <TopSearch topSearch={topSearch} />
        </div>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  searchData: PropTypes.array.isRequired,
  topSearch: PropTypes.array.isRequired,
};

export default SearchResults;
