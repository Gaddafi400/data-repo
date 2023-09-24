import { Outlet, useNavigation } from 'react-router-dom';
import { Navbar, Loading, Footer, Hero } from '../components';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
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
