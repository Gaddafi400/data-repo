import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { TextInput } from '../../Dashboard/components';

import {
  customFetch,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
} from '../../../utils';

const EditVariable = ({ onClose, initialData, updateVariable }) => {
  console.log('initialData', initialData);
  const initialFormState = {
    name: initialData?.variable,
    alias: initialData?.alias,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    let url = '/admin/variables';
    const token = getUserFromLocalStorage().token;

    url = `${url}/${initialData?.id}`;

    try {
      const response = await customFetch.patch(url, formData, header(token));
      const responseData = response.data.data;
      toast.success('Variable updated successfully!');
    //   setFormData({});
      updateVariable(responseData);
      onClose();
      return { variables: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to update variable. Please try again.'
      );
      return error;
    } finally {
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
          Update a variable
        </h1>

        <div className="mb-6">
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Variable Name"
          />
          <TextInput
            label="Alias"
            name="alias"
            value={formData.alias}
            onChange={handleFormChange}
            placeholder="Alias Name"
          />
        </div>
        <button
          type="submit"
          className={`bg-primary-500 text-white rounded-md px-4 py-2 w-full transition-all ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:bg-primary-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Variable'}
        </button>
      </form>
    </div>
  );
};

EditVariable.propTypes = {
  onClose: PropTypes.func,
  initialData: PropTypes.object,
  updateVariable: PropTypes.func,
};

export default EditVariable;
