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

const EditTown = ({ onClose, initialData, updateTown }) => {
  const initialFormState = {
    name: initialData?.name,
    lga: `${initialData?.lga?.id}`,
    alias: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localGovernments, setLocalGovernments] = useState([]);
  const [stateId, setStateId] = useState(initialData?.state?.id);

  console.log('stateId  ', stateId);
  console.log('formData  ', formData);

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
      toast.success('Town updated successfully!');
      setFormData({});
      updateTown(responseData);
      return { towns: responseData };
    } catch (error) {
      toast.error('Failed to update town. Please try again.');
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
            selected={initialData && initialData?.lga?.id}
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
  updateTown: PropTypes.func,
};

export default EditTown;
