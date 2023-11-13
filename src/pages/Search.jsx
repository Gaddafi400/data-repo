import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, SearchResults } from '../components';
import { useGlobalContext } from '../context';

const Search = () => {
  const navigate = useNavigate();
  const { searchData, isLoading, topSearch } = useGlobalContext();
  const searchResult = useRef(null);

  useEffect(() => {
    if (!searchData) {
      navigate('/');
    }
  }, [searchData, navigate]);

  // scroll to result
  useEffect(() => {
    if (!isLoading && searchResult.current) {
      searchResult.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (searchData) {
    return (
      <div ref={searchResult}>
        <SearchResults searchData={searchData.results} topSearch={topSearch} />
      </div>
    );
  }

  return null;
};

export default Search;
