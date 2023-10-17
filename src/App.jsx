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

import {
  SharedLayout,
  Dashboard,
  State,
  LocalGov,
  ProtectedRoute,
  Town,
  Commodity,
  Market
} from './pages/Dashboard';

// loaders
import { loader as homeLayoutLoader } from './pages/HomeLayout';
import { loader as singleDataLoader } from './pages/SingleData';
import { loader as stateLoader } from './pages/Dashboard/State';
import { loader as localGovLoader } from './pages/Dashboard/LocalGov';
import { loader as townLoader } from './pages/Dashboard/Town';
import { loader as commodityLoader } from './pages/Dashboard/Commodity';
import { loader as marketLoader } from './pages/Dashboard/Market';

import { action as landingAction } from './pages/Landing';
import { action as loginAction } from './pages/Login';

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
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: ErrorElement,
      },
      {
        path: 'state',
        element: <State />,
        loader: stateLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'local-govt',
        element: <LocalGov />,
        loader: localGovLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'town',
        element: <Town />,
        loader: townLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'commodity',
        element: <Commodity />,
        loader: commodityLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'market',
        element: <Market />,
        loader: marketLoader,
        errorElement: ErrorElement,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
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
