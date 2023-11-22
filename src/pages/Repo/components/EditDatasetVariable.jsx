import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';

import {
  customFetch,
  transformData,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
} from '../../../utils';

const EditDatasetVariable = ({ onClose, initialData, datasetId }) => {
  const initialFormState = {
    variables: [
      {
        variable: initialData?.variable,
        variableOptions: [
          {
            name: 'firstColumn',
            label: 'First Column',
            selected: initialData?.firstColumn,
          },
          {
            name: 'chartData',
            label: 'Chart Data',
            selected: initialData?.chartData,
          },
          {
            name: 'chartLabel',
            label: 'Chart Label',
            selected: initialData?.chartLabel,
          },
        ],
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVariableOptionToggle = (vIndex, index) => {
    const updatedFormData = { ...formData };
    const updatedOptions = [...formData.variables[vIndex].variableOptions];

    updatedOptions[index] = {
      ...updatedOptions[index],
      selected: !updatedOptions[index].selected,
    };

    updatedFormData.variables[vIndex].variableOptions = updatedOptions;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = `admin/subcategories/${datasetId}/variable/${initialData?.id}`;
    const token = getUserFromLocalStorage().token;

    // transform the data into proper shape
    const { variables } = transformData(formData);

    // eslint-disable-next-line no-unused-vars
    const { variable, ...payload } = variables[0];

    try {
      const response = await customFetch.patch(url, payload, header(token));
      const responseData = response.data?.data;
      toast.success('Variable updated successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 800);
      return { variable: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to update a variable. Please try again.'
      );
      return error;
    } finally {
      setFormData(initialFormState);
      setIsSubmitting(false);
    }
  };

  //   // get variables list
  //   useEffect(() => {
  //     const url = '/admin/variables';
  //     const token = getUserFromLocalStorage().token;

  //     customFetch
  //       .get(url, header(token))
  //       .then((response) => {
  //         setVariables(response.data?.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching variables options:', error);
  //       });
  //   }, []);

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
          Update a variable
        </h1>

        {formData.variables?.map((variable, vIndex) => (
          <div className="mb-2 border rounded-md p-4" key={vIndex}>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium"
            >
              Variables
            </label>

            <select
              readOnly
              value={formData.variables[0].variable}
              className="mb-3 bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
            >
              <option value="">{initialData.variable}</option>
            </select>

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

        {/* End Variables */}

        <button
          type="submit"
          className={`bg-primary-500 mt-6 text-white rounded-md px-4 py-2 w-full transition-all ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:bg-primary-600'
          }`}
        >
          {isSubmitting ? 'Updating...' : 'Update Variable'}
        </button>
      </form>
    </div>
  );
};

EditDatasetVariable.propTypes = {
  onClose: PropTypes.func,
  initialData: PropTypes.object,
  datasetId: PropTypes.string,
};

export default EditDatasetVariable;
