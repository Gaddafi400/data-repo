import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { Navbar } from './components';
import { Loading } from '../../components';

const SharedLayout = () => {
  const navigation = useNavigation();
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  useEffect(() => {
    setInitialPageLoad(false);
  }, []);

  const isPageLoading = navigation.state === 'loading' || initialPageLoad;
  console.log(isPageLoading);

  return (
    <>
      <Navbar />
      {isPageLoading ? <Loading /> : <Outlet />}
    </>
  );
};
export default SharedLayout;

// className="align-element py-20"
