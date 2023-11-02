import PropTypes from 'prop-types';

const MAX_DESCRIPTION_LENGTH = 200;

const SearchCard = ({ heading, description, handleClick }) => {
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  return (
    <div className="px-4 py-6  search-card ">
      <h1>{heading}</h1>
      <p>{truncatedDescription}</p>
      <button onClick={handleClick} className="text-sm">
        Read more {'>>>'}
      </button>
    </div>
  );
};

SearchCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SearchCard;
