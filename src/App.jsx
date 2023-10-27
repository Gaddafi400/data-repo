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
  Redirect,
} from './pages';

import {
  SharedLayout,
  Dashboard,
  State,
  LocalGov,
  ProtectedRoute,
  Town,
  Commodity,
  Users,
  Market,
} from './pages/Dashboard';

import {
  Dashboard as RepoDashboard,
  SharedLayout as RepoSharedLayout,
  ProtectedRoute as RepoProtectedRoute,
  Variable,
  Categories,
  Cknowledge,
  Operation,
  Dataset,
  SingleDataset,
} from './pages/Repo';

// loaders
import { loader as homeLayoutLoader } from './pages/HomeLayout';
import { loader as singleDataLoader } from './pages/SingleData';
// market finder
import { loader as dashboardLoader } from './pages/Dashboard/Dashboard';
import { loader as stateLoader } from './pages/Dashboard/State';
import { loader as localGovLoader } from './pages/Dashboard/LocalGov';
import { loader as townLoader } from './pages/Dashboard/Town';
import { loader as commodityLoader } from './pages/Dashboard/Commodity';
import { loader as marketLoader } from './pages/Dashboard/Market';
import { loader as usersLoader } from './pages/Dashboard/Users';
// repo
import { loader as variableLoader } from './pages/Repo/Variable';
import { loader as categoriesLoader } from './pages/Repo/Categories';
import { loader as cKnowledgeLoader } from './pages/Repo/Cknowledge';
import { loader as operationLoader } from './pages/Repo/Operation';
import { loader as datasetLoader } from './pages/Repo/Dataset';
import { loader as singleDatasetLoader } from './pages/Repo/SingleDataset';
import { loader as repoDashboardLoader } from './pages/Repo/Dashboard';
//
import { action as landingAction } from './pages/Landing';
// import { action as loginAction } from './pages/Login';

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
        loader: dashboardLoader,
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
      {
        path: 'users',
        element: <Users />,
        loader: usersLoader,
        errorElement: ErrorElement,
      },
    ],
  },
  {
    path: '/repo',
    element: (
      <RepoProtectedRoute>
        <RepoSharedLayout />
      </RepoProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <RepoDashboard />,
        loader: repoDashboardLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'variable',
        element: <Variable />,
        loader: variableLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'categories',
        element: <Categories />,
        loader: categoriesLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'common-knowledge',
        element: <Cknowledge />,
        loader: cKnowledgeLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'operation',
        element: <Operation />,
        loader: operationLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'dataset',
        element: <Dataset />,
        loader: datasetLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'dataset/:id',
        element: <SingleDataset />,
        loader: singleDatasetLoader,
        errorElement: ErrorElement,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/redirect',
    element: <Redirect />,
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
