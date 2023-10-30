import PropTypes from 'prop-types';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  darkMode,
  required,
  type,
}) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className={`block mb-2 text-base font-medium ${
          darkMode ? 'text-white' : 'text-gray-600'
        }`}
      >
        {label}:
      </label>
      <input
        type={type ? type : 'text'}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-3 ${
          darkMode
            ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
            : ''
        }`}
        placeholder={placeholder}
        required={required ? true : false}
      />
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  darkMode: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default TextInput;
