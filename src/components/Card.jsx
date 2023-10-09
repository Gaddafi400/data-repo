import PropTypes from 'prop-types';

const Card = ({ title, description, imageUrl, position }) => {
  return (
    <div
      className="card align-element py-20"
      style={{ flexDirection: position === 'right' ? 'row-reverse' : '' }}
    >
      <div className="content">
        <h1 className="text-black font-bold">{title}</h1>
        <p className="text-black">{description}</p>
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
