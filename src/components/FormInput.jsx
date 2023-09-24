import PropTypes from 'prop-types';

const FormInput = ({ label, name, type, defaultValue, placeholder, size }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        className={`input input-bordered ${size}`}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default FormInput;
