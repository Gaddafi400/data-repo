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

const EditCknowledge = ({ onClose, initialData, updateCknowledge }) => {
  console.log('initialData', initialData);

  const initialFormState = {
    title: initialData?.title,
    message: initialData?.message,
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
    let url = '/admin/knowledge';
    const token = getUserFromLocalStorage().token;

    url = `${url}/${initialData?.id}`;

    try {
      const response = await customFetch.patch(url, formData, header(token));
      const responseData = response.data.data;
      console.log('responseData', responseData);
      toast.success('Cknowledge updated successfully!');
      setFormData({});
      updateCknowledge(responseData);
      onClose();
      return { Cknowledge: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response?.data.data);
      toast.error(
        errorMessage || 'Failed to update Cknowledge. Please try again.'
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
          Update a Common Knowledge
        </h1>

        <div className="mb-6">
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            placeholder="Title"
          />
          <div className="col-span-full mb-4">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows="3"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about the common knowledge.
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
          {isSubmitting ? 'Updating...' : 'Update Cknowledge'}
        </button>
      </form>
    </div>
  );
};

EditCknowledge.propTypes = {
  onClose: PropTypes.func,
  initialData: PropTypes.object,
  updateCknowledge: PropTypes.func,
};

export default EditCknowledge;
