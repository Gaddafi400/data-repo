import PropTypes from 'prop-types';

const Select = ({ id, options, value, onChange, placeholder }) => {
  return (
    <select
      id={id}
      className="block px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options?.map((option) => (
        <option key={option?.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Select;
