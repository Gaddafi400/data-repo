import PropTypes from 'prop-types';

const Select = ({
  id,
  options,
  value,
  onChange,
  placeholder,
  label,
  selected,
}) => {
  // determine the default value based on the selected prop
  const defaultValue = selected
    ? options?.find((option) => option.id === selected)
    : '';

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
        value={value}
        onChange={onChange}
        name={id}
        required
      >
        {/* default value logic */}
        {defaultValue ? (
          <option value={defaultValue?.id}>{defaultValue.name}</option>
        ) : (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options?.map((option) => {
          return (
            <option key={option?.id} value={option.id}>
              {/* {variable when using it for data set} */}
              {option?.name || option?.variable || option?.operation}
            </option>
          );
        })}
      </select>
    </>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.array,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
  ]),
};

export default Select;
