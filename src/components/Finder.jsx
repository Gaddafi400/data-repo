import PropTypes from 'prop-types';

const Finder = ({ title, description, imageUrl }) => {
  return (
    <div className="px-6 sm:px-16 lg:px-20 finder ">
      <div className="content">
        <h1 className="text-slate-800 text-center title-font pb-8 mb:pb-12 pt-8 font-bold text-3xl sm:text-4xl lg:text-right lg:pr-12">
          {title}
        </h1>
        <p className="text-slate-800 text-lg md:text-xl lg:text-right lg:pr-12">
          {description}
        </p>
      </div>
      <img src={imageUrl} alt={title} className="object-cover mb-4" />
    </div>
  );
};

Finder.propTypes = {
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Finder;
