import PropTypes from 'prop-types';

const MAX_DESCRIPTION_LENGTH = 200;

const SearchCard = ({ heading, description, handleClick }) => {
  const truncatedDescription =
    description?.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  return (
    <div className="px-4 py-6 search-card ">
      <h1 className="text-lg font-semibold text-slate-800">
        {heading}
      </h1>
      <p className="text-base">{truncatedDescription}</p>
      <button
        onClick={handleClick}
        className="text-sm bg-primary-500 rounded-lg py-2"
      >
        Read more {'>>>'}
      </button>
    </div>
  );
};

SearchCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default SearchCard;
