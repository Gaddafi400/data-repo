import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Select } from '../../../components';
import TextInput from './TextInput';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  flattenErrorMessage,
  header,
} from '../../../utils';

const CreateTown = ({ onClose, onTownCreated }) => {
  const initialFormState = {
    name: '',
    state: '',
    lga: '',
    alias: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState([]);
  const [localGovernments, setLocalGovernments] = useState([]);

  // Fetch states
  const fetchStates = async () => {
    const stateUrl = '/guest/states/';
    try {
      const response = await customFetchMarket.get(stateUrl);
      setStates(response.data?.data);
      setLocalGovernments([]);
    } catch (error) {
      console.error('Error fetching state options:', error);
    }
  };

  // useEffect for fetching states
  useEffect(() => {
    fetchStates();
  }, []);

  // useEffect for fetching local governments
  useEffect(() => {
    if (formData.state) {
      const localGovernmentUrl = `/guest/states/${formData.state}/lgas`;
      customFetchMarket
        .get(localGovernmentUrl)
        .then((response) => {
          formData.lga = '';
          setLocalGovernments(response.data?.data);
        })
        .catch((error) => {
          console.error('Error fetching local government options:', error);
        });
    }
  }, [formData.state]);

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
    const { state, ...formDataWithoutState } = formData;
    try {
      const response = await customFetchMarket.post(
        url,
        formDataWithoutState,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('Town created successfully!');
      setFormData(initialFormState);
      onTownCreated(responseData);
      onClose();
      return { towns: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to create town. Please try again.');

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
          Create a new town
        </h1>

        <div className="mb-6">
          <TextInput
            label="Town Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Town name"
          />
          {states.length > 0 ? (
            <Select
              id="state"
              name="state"
              options={states}
              value={formData.state}
              onChange={handleFormChange}
              placeholder="Select State"
              label="State"
            />
          ) : (
            <div>Loading states...</div>
          )}

          <Select
            id="lga"
            name="lga"
            options={localGovernments}
            value={formData.lga}
            onChange={handleFormChange}
            placeholder="Select LGA"
            label="LGA"
          />

          <TextInput
            id="alias"
            name="alias"
            label="Alias"
            value={formData.alias}
            onChange={handleFormChange}
            placeholder="Alias"
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
  onTownCreated: PropTypes.func,
};

export default CreateTown;
