import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { TextInput } from '../../Dashboard/components';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  header,
} from '../../../utils';

const EditTown = ({ onClose, initialData }) => {
  const initialFormState = {
    name: initialData?.name,
    description: `${initialData?.description}`,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('formData  ', initialData);

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
    let url = '/admin/towns';
    const token = getUserFromLocalStorage().token;

    url = `${url}/${initialData?.id}`;

    try {
      const response = await customFetchMarket.patch(
        url,
        formData,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('Dataset updated successfully!');
      setFormData({});
      onClose();
      window.location.reload(false);
      return { dataset: responseData };
    } catch (error) {
      toast.error('Failed to update dataset. Please try again.');
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
          Update a dataset
        </h1>

        <div className="mb-6">
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Name"
          />

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
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

EditTown.propTypes = {
  onClose: PropTypes.func,
  initialData: PropTypes.object,
};

export default EditTown;
