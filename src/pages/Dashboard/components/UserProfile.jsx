import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import TextInput from './TextInput';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  flattenErrorMessage,
  header,
} from '../../../utils';

const initialFormState = {
  currentPassword: '',
  password: '',
  password_confirmation: '',
};

const UserProfile = ({ onClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = getUserFromLocalStorage().user;

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
    let url = '/admin/users/password/';
    const token = getUserFromLocalStorage().token;

    try {
      const response = await customFetchMarket.post(
        url,
        formData,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('Password updated successfully!');
      setFormData(initialFormState);
      onClose();
      return { user: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to update password. Please try again.'
      );
      return error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-town flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 mt-6 w-full max-w-lg max-h-[100vh] lg:max-h-[68vh] overflow-y-auto">
        <div className="text-right text-2xl">
          <button
            className="close-button text-right"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &#x2715;
          </button>
        </div>

        <div className="text-center mt-6 mb-6">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border"
          />

          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.type}</p>
        </div>
        <div className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">Contact Information</h3>
          <ul className="text-gray-700">
            <li className="mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone:</span> {user.phone_number}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Organization:</span>{' '}
              {user.organization}
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form style={{ margin: '0' }} onSubmit={handleSubmit}>
            <div className="mt-2">
              <TextInput
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                value={formData.currentPassword}
                onChange={handleFormChange}
                placeholder="Current Password"
                type="password"
              />
            </div>
            <div className="mt-2">
              <TextInput
                id="password"
                name="password"
                label="New Password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="New Password"
                type="password"
              />
            </div>
            <div className="mt-2">
              <TextInput
                id="password_confirmation"
                name="password_confirmation"
                label="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleFormChange}
                placeholder="Confirm Password"
                type="password"
              />
            </div>

            <button
              type="submit"
              className={`bg-primary-500 mt-2 text-white rounded-md px-4 py-2 w-full transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'hover:bg-primary-600'
              }`}
            >
              {isSubmitting ? 'Submitting' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  onClose: PropTypes.func,
};

export default UserProfile;
