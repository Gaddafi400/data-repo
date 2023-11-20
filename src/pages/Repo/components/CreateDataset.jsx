import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaMinus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { TextInput } from '../../Dashboard/components';
import { Select } from '../../../components';

import {
  customFetch,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
  transformData,
} from '../../../utils';

const CreateDataset = ({ onClose, onDatasetCreated }) => {
  const initialFormState = {
    name: '',
    description: '',
    category: '',
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
  const [categories, setCategories] = useState([]);
  const [variables, setVariables] = useState([]);
  [];

  // get category list
  useEffect(() => {
    const url = '/admin/data-category';
    const token = getUserFromLocalStorage().token;

    customFetch
      .get(url, header(token))
      .then((response) => {
        setCategories(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching category options:', error);
      });
  }, []);

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    const url = '/admin/subcategories';
    const token = getUserFromLocalStorage().token;

    // transform the data into proper shape
    const _transformData = transformData(formData);
    console.log(_transformData);
    try {
      const response = await customFetch.post(
        url,
        _transformData,
        header(token)
      );
      const responseData = response.data?.data;
      toast.success('Dataset created successfully!');
      onDatasetCreated(responseData);
      onClose();
      return { category: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to Dataset. Please try again.');
      return error;
    } finally {
      setFormData(initialFormState);
      setIsSubmitting(false);
    }
  };

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
          Create a new dataset
        </h1>

        <div className="mb-6">
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Name"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="category" className="block mb-2 text-sm font-medium">
            Category
          </label>
          <Select
            id="category"
            name="category"
            options={categories}
            value={formData.category}
            onChange={handleFormChange}
            placeholder="Select a category"
          />
        </div>

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
            {/* remove variable */}
            <div className="flex justify-end">
              {vIndex > 0 && (
                <button
                  className="bg-red-500 text-white  px-1 py-1 rounded-full"
                  onClick={(e) => removeVariable(e, vIndex)}
                >
                  <FaMinus />
                </button>
              )}
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

          {/* {formData.variables.length > 1 && (
            <button
              className="bg-red-500 text-white rounded-md px-3 py-2"
              onClick={(e) => removeVariable(e, formData.variables.length - 1)}
            >
              <FaMinus />
            </button>
          )} */}
        </div>

        {/* End Variables */}

        <div className="col-span-full mb-4">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows="3"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about the dataset.
          </p>
        </div>

        <button
          type="submit"
          className={`bg-primary-500 text-white rounded-md px-4 py-2 w-full transition-all ${
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

CreateDataset.propTypes = {
  onClose: PropTypes.func,
  onDatasetCreated: PropTypes.func,
};

export default CreateDataset;

// i want removing options
