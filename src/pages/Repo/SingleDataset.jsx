import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { customFetch, header, getUserFromLocalStorage } from '../../utils';
import Table from '../../components/Table';
import { Upload } from './components';

let datasetId = '';

export const loader = async ({ params }) => {
  const token = getUserFromLocalStorage().token;
  datasetId = params.id;
  try {
    const url = '/admin/subcategories';
    const response = await customFetch(`${url}/${params.id}`, header(token));
    return {
      singleRecord: response.data.data,
    };
  } catch (error) {
    return error;
  }
};

const SingleDataset = () => {
  const { singleRecord } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const { name, variables, category, description, dataRecord, operations } =
    singleRecord;

  const tableData = {
    variables,
    dataRecord,
  };

  const handleDownload = () => {
    if (isDownloading) {
      return;
    }

    setIsDownloading(true);

    const url = `https://backend1.steadyvariables.com/data/api/admin/subcategories/${datasetId}/template`;
    const token = getUserFromLocalStorage().token;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Failed to fetch the Excel file');
        }
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.xlsx`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        // Clean up the URL and anchor element
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Download completed!');
      })
      .catch(() => {
        toast.error('Download failed. Please try again.');
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  const openCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  if (isModalOpen) {
    return <Upload onClose={openCloseModal} datasetId={datasetId} />;
  }

  return (
    <div className="admin-container container-with-sidebar">
      <div className="">
        {/* download and upload dataset */}
        <div className="flex flex-col lg:flex-row justify-end gap-3 mb-2">
          <button
            className="bg-primary-500 text-white rounded-md px-3 py-2 hover:bg-primary-700"
            onClick={openCloseModal}
          >
            Upload dataset
          </button>
          <button
            className={`bg-primary-500 text-white rounded-md px-3 py-2 hover:bg-primary-700 ${
              isDownloading ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download template'}
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="text-lg text-gray-700 mb-4">{category}</p>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Variables */}
        <h2 className="text-xl font-semibold mb-2">Variables</h2>
        <ul className="list-disc pl-6 mb-4">
          {variables.map((variable) => (
            <li key={variable.id}>{variable.variable}</li>
          ))}
        </ul>

        {/* Operations */}
        <h2 className="text-xl font-semibold mb-2">Operations</h2>
        <ul className="list-disc pl-6 mb-4">
          {operations.map((operation) => (
            <li key={operation.id}>{operation.operation}</li>
          ))}
        </ul>

        {/* Data Records */}
        <div
          className="border border-primary-500 rounded-lg"
          style={{ maxHeight: '500px', overflowX: 'auto' }}
        >
          <Table data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default SingleDataset;
