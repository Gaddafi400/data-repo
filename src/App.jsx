import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from './components';
import { HomeLayout, Landing, Error, About, Search, SingleData } from './pages';

// loaders
import { loader as homeLayoutLoader } from './pages/HomeLayout';
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
      { path: 'search-results', element: <Search /> },
    ],
  },
  {
    path: '/dataset/:id',
    element: <SingleData />,
    errorElement: <Error />,
  },
  // {
  //   path: '/register',
  //   element: <Register />,
  //   errorElement: <Error />,
  // },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
