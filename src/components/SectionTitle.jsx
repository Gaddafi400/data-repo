import PropTypes from 'prop-types';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-primary-500 text-center section-title">
      <h2 className="capitalize text-slate-800  font-bold">
        {title}
      </h2>
      <span className="text-center text-slate-800 font-normal">
        {subtitle}
      </span>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionTitle;
