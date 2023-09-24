import PropTypes from 'prop-types';

const Card = ({ title, description, imageUrl, position }) => {
  return (
    <div
      className="card"
      style={{ flexDirection: position === 'right' ? 'row-reverse' : '' }}
    >
      <div className="content">
        <h1 className="text-black font-bold">{title}</h1>
        <p className="text-black font-medium">{description}</p>
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
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
