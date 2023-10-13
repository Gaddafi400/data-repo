import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from './components';
import {
  HomeLayout,
  Landing,
  Contact,
  Error,
  About,
  Search,
  SingleData,
  Mfinder,
  Login,
  Register,
} from './pages';
import { DashBoard } from './pages/Dashboard';

// loaders
import { loader as homeLayoutLoader } from './pages/HomeLayout';
import { loader as singleDataLoader } from './pages/SingleData';
import { action as landingAction } from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: homeLayoutLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        // loader: landingLoader,
        errorElement: ErrorElement,
        action: landingAction,
      },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'search-results', element: <Search /> },
    ],
  },
  {
    path: '/dataset/:id',
    element: <SingleData />,
    loader: singleDataLoader,
    errorElement: <Error />,
  },
  {
    path: '/market-finder',
    element: <Mfinder />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
