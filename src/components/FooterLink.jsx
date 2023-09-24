import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import arrow from '../assets/arrow.png';

const FooterLink = ({ title, link }) => {
  return (
    <div className="capitalize column-2-list">
      <img src={arrow} alt="arrow" />
      <Link to={link}>{title}</Link>
    </div>
  );
};

FooterLink.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FooterLink;
