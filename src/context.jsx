import React, { useState, useContext } from 'react';
const AppContext = React.createContext();
import PropTypes from 'prop-types';

const AppProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        searchData,
        setSearchData,
        isLoading,
        setIsLoading,
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
