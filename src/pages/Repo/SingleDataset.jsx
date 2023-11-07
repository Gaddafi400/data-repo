import { useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  customFetch,
  header,
  getUserFromLocalStorage,
  flattenErrorMessage,
} from '../../utils';
import Table from '../../components/Table';
import { Upload, AddOperation, AddVariable } from './components';

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
    if (error.response.status === 401) {
      return redirect('/login');
    }
    return error;
  }
};

const SingleDataset = () => {
  const { singleRecord } = useLoaderData();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOperation, setIsAddOperation] = useState(false);
  const [isAddVariable, setIsVariable] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const { name, variables, category, description, dataRecord, operations } =
    singleRecord;

  const [variableState, setVariableState] = useState(variables);

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

  const handleAddOperation = (e) => {
    e.preventDefault();
    setIsAddOperation(!isAddOperation);
  };

  const handleAddVariable = (e) => {
    e.preventDefault();
    setIsVariable(!isAddVariable);
  };

  const handleDeleteVariable = async (e, variableId) => {
    e.preventDefault();
    const token = getUserFromLocalStorage().token;
    const url = `admin/subcategories/${variableId}/variable`;

    try {
      const response = await customFetch.delete(url, header(token));
      const responseData = response.data?.data;
      toast.success('Variable deleted successfully!');
      return { category: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to variable. Please try again.');
      return error;
    }
  };

  if (isModalOpen) {
    return <Upload onClose={openCloseModal} datasetId={datasetId} />;
  }

  if (isAddOperation) {
    return <AddOperation onClose={handleAddOperation} />;
  }

  if (isAddVariable) {
    return <AddVariable onClose={handleAddVariable} datasetId={datasetId} />;
  }

  return (
    <div className="admin-container container-with-sidebar">
      <div className="">
        {/* download and upload dataset */}
        <div className="flex flex-col lg:flex-row justify-between gap-3 mb-6">
          <button
            className=" text-white bg-primary-400 hover:bg-primary-700 font-medium rounded-md text-sm px-4 py-2 flex items-center w-[90px]"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="inline mr-2" /> Back
          </button>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-primary-400 text-white font-medium text-sm rounded-md px-3 py-2 hover:bg-primary-700"
              onClick={openCloseModal}
            >
              Upload dataset
            </button>
            <button
              className={`bg-primary-400 text-white font-medium text-sm  rounded-md px-3 py-2 hover:bg-primary-700 ${
                isDownloading ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download template'}
            </button>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">{name}</h1>
        <p className="text-lg text-slate-800 mb-4">{category}</p>
        <p className="text-slate-800mb-4">{description}</p>

        {/* Variables */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold mb-3 mt-3 sm:text-2xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
            Variables
          </h2>
          <div
            className=" text-black rounded-lg h-[28px] px-2 flex items-center border  border-black cursor-pointer  hover:bg-primary-400 hover:text-white"
            onClick={handleAddVariable}
          >
            <AiOutlinePlus
              className="mr-2 bg-primary-500 text-white rounded-full"
              style={{ fontSize: '20px' }}
            />{' '}
            <span className="text-sm">Add variable</span>
          </div>
        </div>

        <div className="border border-primary-100 rounded-lg p-1 mb-12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-slate-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  Variables
                </th>
                <th scope="col" className="px-6 py-3 border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {variableState.map((variable) => (
                <tr key={variable.id} className="border-b border-gray-300">
                  <td className="px-6 py-4">{variable.variable}</td>
                  <td className="px-6 py-4 flex items-center">
                    <span
                      className="mr-2 text-red-600 cursor-pointer"
                      onClick={(e) => handleDeleteVariable(e, variable.id)}
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* End Variables */}

        {/* Operations */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold mb-3 mt-3 sm:text-2xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
            Operations
          </h2>
          <div
            className=" text-black rounded-lg h-[28px] px-2   flex items-center border  border-black cursor-pointer  hover:bg-primary-400 hover:text-white"
            onClick={handleAddOperation}
          >
            <AiOutlinePlus
              className="mr-2 bg-primary-500 text-white rounded-full hover:bg-primary-700"
              style={{ fontSize: '20px' }}
            />{' '}
            <span className="text-sm"> Add operation</span>
          </div>
        </div>

        <div className="border border-primary-100 rounded-lg p-1 mb-12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto">
            <thead className="text-xs text-slate-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-gray-300">
                  Variables
                </th>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {operations.map((operation) => (
                <tr
                  key={operation.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{operation.operation}</td>
                  <td className="px-6 py-4 flex items-center">
                    <span
                      className="mr-2 text-red-600 cursor-pointer"
                      // onClick={() => handleDeleteVariable(variable.id)}
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* End operations */}

        {/* Data Records */}
        <h2 className="text-xl font-semibold mb-3 mt-3 sm:text-2xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          Dataset Records
        </h2>
        <div
          className="border border-primary-100 rounded-lg"
          style={{ maxHeight: '500px', overflowX: 'auto' }}
        >
          <Table data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default SingleDataset;
