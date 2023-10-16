import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Select } from '../../../components';
import TextInput from './TextInput';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  header,
} from '../../../utils';

const EditTown = ({ onClose, initialData }) => {
  const initialFormState = {
    name: '',
    state: '',
    lga: '',
    alias: '',
  };

  const [formData, setFormData] = useState(initialData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [localGovernments, setLocalGovernments] = useState([]);
  const [stateId, setStateId] = useState(null);

  // get states
  const fetchAndSetStates = async () => {
    const stateUrl = '/guest/states/';
    try {
      const response = await customFetchMarket.get(stateUrl);
      setLocalGovernments([]);
      const filteredState = response.data?.data.find(
        (state) => state.name === initialData.state
      );
      if (filteredState) {
        setStates([filteredState]);
        setFormData({
          ...formData,
          state: filteredState.id,
        });
      } else {
        console.error('No matching state found.');
      }
    } catch (error) {
      console.error('Error fetching state options:', error);
    } finally {
      console.log('--');
    }
  };

  // useEffect for fetching and setting states
  useEffect(() => {
    const stateUrl = '/guest/states/';
    customFetchMarket
      .get(stateUrl)
      .then((response) => {
        setLocalGovernments([]);
        setStates(response.data?.data);

        const filteredState = response.data?.data.find(
          (state) => state.name === initialData.state
        );
        if (filteredState) {
          setStateId(filteredState?.id);
        } else {
          console.error('No matching state found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching state options:', error);
      });
  }, [initialData]);

  // get local govt
  useEffect(() => {
    const localGovernmentUrl = `/guest/states/${stateId}/lgas`;
    customFetchMarket
      .get(localGovernmentUrl)
      .then((response) => {
        setLoading(true);
        setLocalGovernments(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching local government options:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formData.state, stateId]);

  //   Watch for changes in the initialData prop
  useEffect(() => {
    if (initialData) {
      //   get localGovernments from localGovernments where == initial.name
      const lgaId = localGovernments?.find(
        (lga) => lga.name === initialData.lga
      );
      setFormData({
        ...formData,
        ...initialData,
        lga: `${lgaId?.id}`,
      });
    }
  }, []);

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

    url = `${url}/${formDataWithoutState?.id}`;
    const { id, numberOfMarkets, ...payload } = formDataWithoutState;
    try {
      const response = await customFetchMarket.patch(
        url,
        payload,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('Town updated successfully!');
      window.location.reload(false);
      setFormData(initialFormState);
      onClose();
      setIsSubmitting(false);
      return { towns: responseData };
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Failed to update town. Please try again.');
      return error;
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
          Update a new town
        </h1>

        <div className="mb-6">
          <TextInput
            label="Town Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Town name"
          />

          <Select
            id="lga"
            name="lga"
            options={localGovernments}
            value={formData.lga}
            onChange={handleFormChange}
            placeholder="Select LGA"
            label="LGA"
            selected={initialData && initialData?.lga}
            loading={loading}
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
          //   disabled={isSubmitting}
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
