import { Outlet, useNavigation } from 'react-router-dom';
import { Navbar, Loading, Footer } from '../components';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
      <Footer />
    </>
  );
};
export default HomeLayout;
