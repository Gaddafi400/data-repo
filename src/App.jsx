import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from './components';
import { HomeLayout, Landing, Error, About } from './pages';

// loaders
// import { loader as landingLoader } from './pages/Landing';
// import { loader as singleProductLoader } from './pages/SingleProduct';
// import { loader as productsLoader } from './pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        // loader: landingLoader,
        errorElement: ErrorElement,
      },
      { path: 'about', element: <About /> },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  //   errorElement: <Error />,
  // },
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

//       <div className="bg-primary-900">
//         <h1 className="text-7xl font-bold underline">Tailwind project</h1>
//       </div>
