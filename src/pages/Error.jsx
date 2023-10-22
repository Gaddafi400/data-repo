import { useRouteError, Link, } from 'react-router-dom';
import notFound from '../assets/404.png';

const Error = () => {
  const error = useRouteError();
 
 

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <img src={notFound} alt="notFound" />
        <div className="mt-10">
          <Link
            to="/"
            className="btn bg-primary-400 text-white hover:bg-primary-300"
          >
            go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">there was an error...</h4>
    </main>
  );
};
export default Error;
