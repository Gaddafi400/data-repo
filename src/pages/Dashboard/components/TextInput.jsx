import PropTypes from 'prop-types';

const TextInput = ({ label, name, value, onChange, placeholder, darkMode }) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3 ${
          darkMode
            ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
            : ''
        }`}
        placeholder={placeholder}
        required
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
};

export default TextInput;
