import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaMinus } from 'react-icons/fa';

import { Select } from '../../../components';

import {
  customFetch,
  transformData,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
} from '../../../utils';

const AddVariable = ({ onClose, datasetId }) => {
  const initialFormState = {
    variables: [
      {
        variable: '',
        variableOptions: [
          { name: 'firstColumn', label: 'First Column', selected: false },
          { name: 'chartData', label: 'Chart Data', selected: false },
          { name: 'chartLabel', label: 'Chart Label', selected: false },
        ],
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variables, setVariables] = useState([]);

  const handleVariableOptionToggle = (vIndex, index) => {
    console.log(formData);
    const updatedFormData = { ...formData };
    const updatedOptions = [...formData.variables[vIndex].variableOptions];

    updatedOptions[index] = {
      ...updatedOptions[index],
      selected: !updatedOptions[index].selected,
    };

    updatedFormData.variables[vIndex].variableOptions = updatedOptions;
    setFormData(updatedFormData);
  };

  const handleVariableChange = (e, index) => {
    const variableValue = e.target.value;
    const updatedVariables = [...formData.variables];

    updatedVariables[index] = {
      ...updatedVariables[index],
      variable: variableValue,
    };
    setFormData({
      ...formData,
      variables: updatedVariables,
    });
  };

  const addVariable = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      variables: [
        ...formData.variables,
        {
          variable: '',
          variableOptions: [
            { name: 'firstColumn', label: 'First Column', selected: false },
            { name: 'chartData', label: 'Chart Data', selected: false },
            { name: 'chartLabel', label: 'Chart Label', selected: false },
          ],
        },
      ],
    });
  };

  const removeVariable = (e, index) => {
    e.preventDefault();
    const updatedVariables = [...formData.variables];
    updatedVariables.splice(index, 1);
    setFormData({
      ...formData,
      variables: updatedVariables,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = `admin/subcategories/${datasetId}/variable`;
    const token = getUserFromLocalStorage().token;

    // transform the data into proper shape
    const { variables } = transformData(formData);

    const payload = {
      variables: variables,
    };

    try {
      const response = await customFetch.patch(url, payload, header(token));
      const responseData = response.data?.data;
      toast.success('New variable created successfully!');
      close();
      return { category: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to variable. Please try again.');
      return error;
    } finally {
      setFormData(initialFormState);
      setIsSubmitting(false);
    }
  };

  // get variables list
  useEffect(() => {
    const url = '/admin/variables';
    const token = getUserFromLocalStorage().token;

    customFetch
      .get(url, header(token))
      .then((response) => {
        setVariables(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching variables options:', error);
      });
  }, []);

  return (
    <div className="create-town">
      <form className="rounded-lg p-4" onSubmit={handleSubmit}>
        <div className="text-right text-lg">
          <button
            className="close-button text-right"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &#x2715;
          </button>
        </div>
        <h1 className="text-2xl font-medium  text-gray-800 dark:text-white my-4">
          Add more variable
        </h1>

        {formData.variables?.map((variable, vIndex) => (
          <div className="mb-2 border rounded-md p-4" key={vIndex}>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium"
            >
              Variables
            </label>
            <Select
              id="variable"
              name="variable"
              options={variables}
              value={formData.variables[vIndex].variable}
              onChange={(e) => handleVariableChange(e, vIndex, variable)}
              placeholder="Select a variable"
            />
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium"
            >
              Select one of the available option
            </label>
            <div>
              <ul className="flex items-center flex-row gap-3">
                {variable?.variableOptions.map((variableOption, index) => (
                  <li key={index} className="space-x-2">
                    <input
                      type="checkbox"
                      checked={variableOption.selected}
                      onChange={() => handleVariableOptionToggle(vIndex, index)}
                      className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-200 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700">
                      {variableOption.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Add more variables */}
        <div className="flex justify-end gap-2">
          <button
            className="bg-primary-500 text-white rounded-md px-3 py-2"
            onClick={(e) => addVariable(e)}
          >
            <AiOutlinePlusCircle />
          </button>

          {formData.variables.length > 1 && (
            <button
              className="bg-red-500 text-white rounded-md px-3 py-2"
              onClick={(e) => removeVariable(e, formData.variables.length - 1)}
            >
              <FaMinus />
            </button>
          )}
        </div>

        {/* End Variables */}

        <button
          type="submit"
          className={`bg-primary-500 mt-6 text-white rounded-md px-4 py-2 w-full transition-all ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:bg-primary-600'
          }`}
        >
          {isSubmitting ? 'Submitting' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

AddVariable.propTypes = {
  onClose: PropTypes.func,
  datasetId: PropTypes.string,
};

export default AddVariable;
