import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import TextInput from './TextInput';
import { Select } from '../../../components';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
} from '../../../utils';

const AddCommodity = ({ onClose, marketId, marketName }) => {
  const initialFormState = {
    commodity: '',
    price: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commodities, setCommodities] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch commodities
  const fetchCommodities = async () => {
    const token = getUserFromLocalStorage().token;
    const townUrl = '/admin/commodities';
    try {
      const response = await customFetchMarket.get(townUrl, header(token));
      setCommodities(response.data?.data);
    } catch (error) {
      console.error('Error fetching commodities options:', error);
    }
  };

  // useEffect for fetching towns
  useEffect(() => {
    fetchCommodities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let url = `/admin/markets/${marketId}/commodity`;
    const token = getUserFromLocalStorage().token;

    try {
      const response = await customFetchMarket.patch(
        url,
        formData,
        header(token)
      );
      const responseData = response.data?.data;
      toast.success('Commodity added successfully!');
      setFormData(initialFormState);
      onClose();
      return { commodities: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to add commodity. Please try again.');
      setFormData(initialFormState);
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
          Add commodity to {marketName}
        </h1>

        <div className="mb-6">
          {commodities.length > 0 ? (
            <Select
              id="commodity"
              name="commodity"
              options={commodities}
              value={formData.commodity}
              onChange={handleFormChange}
              placeholder="Select commodity"
              label="Commodity"
            />
          ) : (
            <div>Loading commodities...</div>
          )}

          <TextInput
            id="price"
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleFormChange}
            placeholder="Price"
            type="number"
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
          {isSubmitting ? 'Adding...' : 'Add Commodity'}
        </button>
      </form>
    </div>
  );
};

AddCommodity.propTypes = {
  onClose: PropTypes.func,
  marketId: PropTypes.string,
  marketName: PropTypes.string,
};

export default AddCommodity;
