import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  const handleDateRepositoryClick = () => {
    navigate('/repo');
  };

  const handleMarketFinderClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="rounded-lg flex flex-col sm:flex-row items-center gap-12">
        <button
          className="bg-primary-500 text-white p-3 px-6 rounded-md hover:bg-primary-600 border border-primary-300"
          onClick={handleDateRepositoryClick}
        >
          Data Repository Dashboard
        </button>

        <button
          className="bg-primary-500 text-white p-3 px-8 rounded-md hover:bg-primary-600 border border-primary-300"
          onClick={handleMarketFinderClick}
        >
          Market Finder Dashboard
        </button>
      </div>
    </div>
  );
};

export default Redirect;
