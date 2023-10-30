import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';

import TextInput from './TextInput';
import { Select } from '../../../components';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  flattenErrorMessage,
  header,
} from '../../../utils';

const CreateTown = ({ onClose, onUserCreated }) => {
  const initialFormState = {
    name: '',
    email: '',
    phoneNumber: '',
    type: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTypes, setUserTypes] = useState([
    { name: 'Super admin', id: 'super_admin' },
    { name: 'Admin', id: 'admin' },
  ]);

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
    let url = '/admin/users';
    const token = getUserFromLocalStorage().token;

    try {
      const response = await customFetchMarket.post(
        url,
        formData,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('User created successfully!');
      setFormData(initialFormState);
      onUserCreated(responseData);
      onClose();
      return { towns: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to create user. Please try again.');
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
          Create a new user
        </h1>

        <div className="mb-6">
          <TextInput
            type="text"
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Name"
          />

          <TextInput
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="Email"
          />

          <TextInput
            type="text"
            label="phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            placeholder="Phone Number"
          />

          <Select
            id="type"
            name="type"
            options={userTypes}
            value={formData.type}
            onChange={handleFormChange}
            placeholder="Select user type"
            label="User type"
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

CreateTown.propTypes = {
  onClose: PropTypes.func,
  onUserCreated: PropTypes.func,
};

export default CreateTown;
