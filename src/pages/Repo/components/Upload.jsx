import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';

import {
  customFetch,
  getUserFromLocalStorage,
  header,
  flattenErrorMessage,
} from '../../../utils';

const Upload = ({ onClose, datasetId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(datasetId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if ((file && file.name.endsWith('.xlsx')) || file.name.endsWith('.xls')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      e.target.value = null;
      toast.error(
        'Invalid file format. Please select a file in .xlsx or .xls format.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = '/admin/subcategories/data/upload/';
    const token = getUserFromLocalStorage().token;

    try {
      if (selectedFile) {
        // You can now use the 'selectedFile' in your upload logic
        const formData = new FormData();
        formData.append('template', selectedFile);
        formData.append('subcategory', datasetId);
        const response = await customFetch.post(url, formData, header(token));
        toast.success('Dataset uploaded successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);  
      } else {
        toast.error('Please select a file to upload.');
      }
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to upload dataset. Please try again.'
      );
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
          Upload a dataset
        </h1>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg "
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={handleFileChange}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            Accepted format: Excel .xlsx or .xls
          </p>
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

Upload.propTypes = {
  onClose: PropTypes.func,
  datasetId: PropTypes.string,
};

export default Upload;
