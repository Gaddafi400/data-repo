import PropTypes from 'prop-types';

const Card = ({ title, description, imageUrl, position }) => {
  return (
    <div
      className="px-6 sm:px-16 lg:px-20 card"
      style={{ flexDirection: position === 'right' ? 'row-reverse' : '' }}
    >
      <div className="content">
        <h1 className=" text-slate-800 font-bold title-font pb-8 mb:pb-12 text-3xl sm:text-4xl">
          {title}
        </h1>
        <p className="text-slate-800 text-lg md:text-xl">{description}</p>
      </div>
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
};

Card.propTypes = {
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  position: PropTypes.string,
};

export default Card;
