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
  daysOfWeek,
} from '../../../utils';

const CreateMarket = ({ onClose, onMarketCreated }) => {
  const initialFormState = {
    name: '',
    town: '',
    address: '',
    longitude: '',
    latitude: '',
    alias: '',
    landmark: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [towns, setTowns] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  // Fetch towns
  const fetchTowns = async () => {
    const token = getUserFromLocalStorage().token;
    const townUrl = '/admin/towns';
    try {
      const response = await customFetchMarket.get(townUrl, header(token));
      setTowns(response.data?.data);
    } catch (error) {
      console.error('Error fetching state options:', error);
    }
  };

  // useEffect for fetching towns
  useEffect(() => {
    fetchTowns();
  }, []);

  const handleDayChange = (event) => {
    const selectedDay = event.target.value;

    setActiveDays((prevActiveDays) => {
      if (prevActiveDays.includes(selectedDay)) {
        return prevActiveDays.filter((day) => day !== selectedDay);
      } else {
        return [...prevActiveDays, selectedDay];
      }
    });
  };

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
    let url = '/admin/markets/';
    const token = getUserFromLocalStorage().token;

    const payload = { ...formData, activeDays: activeDays };

    try {
      const response = await customFetchMarket.post(
        url,
        payload,
        header(token)
      );
      const responseData = response.data.data;
      toast.success('Town created successfully!');
      setFormData(initialFormState);
      onMarketCreated(responseData);
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
          Create a new market
        </h1>

        <div className="mb-6">
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Market name"
          />

          {towns.length > 0 ? (
            <Select
              id="town"
              name="town"
              options={towns}
              value={formData.town}
              onChange={handleFormChange}
              placeholder="Select town"
              label="Town"
            />
          ) : (
            <div>Loading towns...</div>
          )}

          <TextInput
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleFormChange}
            placeholder="Enter address"
          />

          <TextInput
            id="landmark"
            name="landmark"
            label="Landmark"
            value={formData.landmark}
            onChange={handleFormChange}
            placeholder="Enter landmark"
          />

          <TextInput
            id="alias"
            name="alias"
            label="Alias"
            value={formData.alias}
            onChange={handleFormChange}
            placeholder="Enter alias"
          />

          <TextInput
            id="longitude"
            name="longitude"
            label="Longitude"
            value={formData.longitude}
            onChange={handleFormChange}
            placeholder="Enter longitude"
          />

          <TextInput
            id="latitude"
            name="latitude"
            label="Latitude"
            value={formData.latitude}
            onChange={handleFormChange}
            placeholder="Enter latitude"
          />
          {/* market days */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Select Active Days</h2>
            <div className="grid grid-cols-2 gap-2">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    value={day}
                    checked={activeDays.includes(day)}
                    onChange={handleDayChange}
                    className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-200 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              Selected Active Days:
              <p className="italic font-semibold">{activeDays.join(', ')}</p>
            </div>
          </div>
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

CreateMarket.propTypes = {
  onClose: PropTypes.func,
  onMarketCreated: PropTypes.func,
};

export default CreateMarket;
