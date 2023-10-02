import PropTypes from 'prop-types';
import dataarrow from '../assets/dataarrow.png';

const Heading = ({ text }) => {
  return (
    <span className="text-white xl:text-1xl md:text-base font-medium flex items-center tracking-wide">
      {text}{' '}
      <img
        className="px-2 w-7 h-5 relative object-cover"
        src={dataarrow}
        alt="dataarrow"
      />
    </span>
  );
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
