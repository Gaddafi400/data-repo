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

const CreateCategory = ({ onClose, onCategoryCreated }) => {
  const initialFormState = {
    name: '',
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
    const url = '/admin/data-category';
    const token = getUserFromLocalStorage().token;

    try {
      const response = await customFetch.post(url, formData, header(token));
      const responseData = response.data?.data;
      toast.success('Category created successfully!');
      onCategoryCreated(responseData);
      onClose();
      return { category: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to create category. Please try again.'
      );
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
          Create a new category
        </h1>

        <div className="mb-6">
          <TextInput
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Commodity Name"
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
          {isSubmitting ? 'Submitting' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

CreateCategory.propTypes = {
  onClose: PropTypes.func,
  onCategoryCreated: PropTypes.func,
};

export default CreateCategory;
