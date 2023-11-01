import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import TextInput from './TextInput';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  flattenErrorMessage,
  header,
} from '../../../utils';

const EditCommodity = ({ onClose, initialData, updateCommodity }) => {
  const initialFormState = {
    name: initialData?.name,
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

    const url = `/admin/commodities/${initialData?.id}`;
    const token = getUserFromLocalStorage().token;

    try {
      const response = await customFetchMarket.patch(
        url,
        formData,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('Commodity updated successfully!');
      setFormData(initialFormState);
      updateCommodity(responseData);
      return { towns: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to update commodity. Please try again.'
      );
      return error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-town">
      <form
        className="rounded-lg p-4"
        onSubmit={handleSubmit}
        style={{ marginTop: '2rem' }}
      >
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
          Update commodity
        </h1>

        <div className="mb-6">
          <TextInput
            id="name"
            name="name"
            label="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Enter Name"
          />

          <TextInput
            id="alias"
            name="alias"
            label="Alias"
            value={formData.alias}
            onChange={handleFormChange}
            placeholder="Enter alias"
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
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

EditCommodity.propTypes = {
  onClose: PropTypes.func,
  updateCommodity: PropTypes.func,
  initialData: PropTypes.object,
};

export default EditCommodity;
