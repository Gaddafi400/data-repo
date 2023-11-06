import { PropTypes } from 'prop-types';

const Category = ({ title, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="category-button hover:bg-primary-700 text-sm sm:text-base"
    >
      {title}
    </button>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Category;
