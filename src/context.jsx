import React, { useState, useContext } from 'react';
const AppContext = React.createContext();
import PropTypes from 'prop-types';

import { getUserFromLocalStorage } from './utils';

const AppProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [topSearch, setTopSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledge, setKnowledge] = useState([]);
  const [user, setUser] = useState(getUserFromLocalStorage());

  return (
    <AppContext.Provider
      value={{
        searchData,
        setSearchData,
        topSearch,
        setTopSearch,
        isLoading,
        setIsLoading,
        knowledge,
        setKnowledge,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
