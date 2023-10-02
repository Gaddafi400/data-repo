import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { Navbar, Loading, Footer, Hero } from '../components';
import { customFetch } from '../utils';

const url = '/guest/index/';

export const loader = async () => {
  try {
    const response = await customFetch(url);
    const responseData = await response.data.data;
    return {
      categories: responseData?.categories,
      datasets: responseData?.datasets,
      knowledge: responseData?.knowledge,
    };
  } catch (error) {
    return error;
  }
};

const HomeLayout = () => {
  const navigation = useNavigation();
 const [ initialPageLoad, setInitialPageLoad] = useState(true);

  useEffect(() => {
    setInitialPageLoad(false);
  }, []);

  const isPageLoading = navigation.state === 'loading' || initialPageLoad;
  
  console.log(isPageLoading);
  return (
    <>
      <Navbar />
      <Hero />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
      <Footer />
    </>
  );
};
export default HomeLayout;

// className="align-element py-20"
