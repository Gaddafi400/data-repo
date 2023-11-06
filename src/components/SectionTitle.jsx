import PropTypes from 'prop-types';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-primary-500 text-center">
      <h2 className="capitalize text-slate-800  py-8 font-semibold text-3xl sm:text-4xl ">
        {title}
      </h2>

      <span className="text-slate-800 text-2xl sm:text-center">{subtitle}</span>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionTitle;
