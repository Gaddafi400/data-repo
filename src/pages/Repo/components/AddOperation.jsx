import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import { Select } from '../../../components';

import {
  customFetch,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
} from '../../../utils';

const AddOperation = ({ onClose, updateOperations, datasetId }) => {
  const initialFormState = {
    operation: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [operations, setOperations] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = `/admin/subcategories/${datasetId}/operation`;
    const token = getUserFromLocalStorage().token;

    try {
      const response = await customFetch.patch(url, formData, header(token));
      const responseData = response.data?.data;
      toast.success('Operation added successfully!');
      updateOperations(responseData?.operations);
      return { operations: responseData?.operations };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to add operation. Please try again.');
      return error;
    } finally {
      setFormData(initialFormState);
      setIsSubmitting(false);
    }
  };

  // get operations list
  useEffect(() => {
    const url = '/admin/operations';
    const token = getUserFromLocalStorage().token;

    customFetch
      .get(url, header(token))
      .then((response) => {
        setOperations(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching operation:', error);
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
        <h1 className="text-2xl font-medium  text-slate-800 dark:text-white my-4">
          Add new operation
        </h1>

        <div className="mb-6">
          <label htmlFor="category" className="block mb-2 text-sm font-medium">
            Operation
          </label>
          <Select
            id="operation"
            name="operation"
            options={operations}
            value={formData.operation}
            onChange={handleFormChange}
            placeholder="Select operation"
          />
        </div>

        <button
          type="submit"
          className={`bg-primary-500 text-white rounded-md px-4 py-2 w-full transition-all ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:bg-primary-600'
          }`}
        >
          {isSubmitting ? 'Adding' : 'Add Operation'}
        </button>
      </form>
    </div>
  );
};

AddOperation.propTypes = {
  onClose: PropTypes.func,
  datasetId: PropTypes.string,
  updateOperations: PropTypes.func,
};

export default AddOperation;
