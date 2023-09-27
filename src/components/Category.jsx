import { PropTypes } from 'prop-types';

const Category = ({ title, handleClick }) => {
  return (
    <button onClick={handleClick} className="category-button">
      {title}
    </button>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Category;

