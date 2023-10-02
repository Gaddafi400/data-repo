import PropTypes from 'prop-types';

const SearchCard = ({ heading, description, handleClick }) => {
  return (
    <div className="align-element py-12  search-card ">
      <h1>{heading}</h1>
      <p>{description}</p>
      <button onClick={handleClick} className="">
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
