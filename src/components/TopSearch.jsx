import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TopSearch = ({ topSearch }) => {
  const navigate = useNavigate();

  const handleClick = async (e, id) => {
    e.preventDefault();
    navigate(`/dataset/${id}`);
  };
  return (
    <div className="subscribe-right rounded-lg" style={{ marginTop: '6rem' }}>
      <h3 className="text-black text-2xl font-medium">Top Search</h3>

      {topSearch.map((item, index) => (
        <p
          onClick={(e) => handleClick(e, item?.id)}
          key={index}
          className="text-black text-base font-light p-4 rounded-lg cursor-pointer bg-primary-50 hover:bg-primary-100"
        >
          {item?.name}
        </p>
      ))}
    </div>
  );
};

TopSearch.propTypes = {
  topSearch: PropTypes.array.isRequired,
};

export default TopSearch;
