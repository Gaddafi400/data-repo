import PropTypes from 'prop-types';

const Finder = ({ title, description, imageUrl }) => {
  return (
    <div className="card align-element py-20 finder">
      <div className="content">
        <h1 className="text-black font-bold">{title}</h1>
        <p className="text-black font-medium">{description}</p>
      </div>
      <img src={imageUrl} alt={title} className="w-[30] h-[30] object-cover" />
    </div>
  );
};

Finder.propTypes = {
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Finder;
