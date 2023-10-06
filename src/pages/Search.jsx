import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, SearchResults } from '../components';
import { useGlobalContext } from '../context';

const Search = () => {
  const navigate = useNavigate();
  const { searchData, isLoading, topSearch } = useGlobalContext();

  useEffect(() => {
    if (!searchData) {
      navigate('/');
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (searchData) {
    return (
      <div>
        <SearchResults searchData={searchData.results} topSearch={topSearch} />
      </div>
    );
  }
};

export default Search;
