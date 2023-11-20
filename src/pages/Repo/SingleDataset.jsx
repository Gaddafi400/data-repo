import { useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash, FaArrowLeft, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  customFetch,
  header,
  getUserFromLocalStorage,
  flattenErrorMessage,
} from '../../utils';
import Table from '../../components/Table';
import {
  Upload,
  AddOperation,
  AddVariable,
  EditDatasetVariable,
} from './components';
import { Confirm } from '../Dashboard/components';

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
  const [isUpdateVariable, setIsUpdateVariable] = useState(false);
  const [editData, setEditData] = useState(false);
  const [isAddOperation, setIsAddOperation] = useState(false);
  const [isAddVariable, setIsVariable] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const { name, variables, category, description, dataRecord, operations } =
    singleRecord;

  const [variablesState, setVariablesState] = useState(variables);
  const [operationsState, setOperationsState] = useState(operations);
  const [deletingStatus, setDeletingStatus] = useState({});
  const [deletingOperationStatus, setDeletingOperationStatus] = useState({});

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

  const handleUpdateVariable = (e, variable) => {
    e.preventDefault();
    setIsUpdateVariable(!isUpdateVariable);
    setEditData(variable);
  };

  const handleDeleteVariable = async (e, variableId) => {
    e.preventDefault();
    const token = getUserFromLocalStorage().token;
    const url = `admin/subcategories/${variableId}/variable`;

    try {
      setDeletingStatus((prevStatus) => ({
        ...prevStatus,
        [variableId]: true,
      }));

      const response = await customFetch.delete(url, header(token));
      const responseData = response.data?.data;

      setVariablesState((prevVariables) => {
        return prevVariables.filter((variable) => variable.id !== variableId);
      });

      toast.success('Variable deleted successfully!');
      return { variable: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to delete variable. Please try again.'
      );
      return error;
    } finally {
      setDeletingStatus((prevStatus) => ({
        ...prevStatus,
        [variableId]: false,
      }));
    }
  };

  const updateVariable = async () => {
    console.log('updateVariable', updateVariable);
  };

  const handleDeleteOperation = async (e, operationId) => {
    e.preventDefault();
    const token = getUserFromLocalStorage().token;
    const url = `admin/subcategories/${operationId}/operation`;

    try {
      setDeletingOperationStatus((prevStatus) => ({
        ...prevStatus,
        [operationId]: true,
      }));

      const response = await customFetch.delete(url, header(token));
      const responseData = response.data?.data;

      setOperationsState((prevOperations) => {
        return prevOperations.filter(
          (operation) => operation.id !== operationId
        );
      });

      toast.success('Operation removed successfully!');
      return { operation: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(
        errorMessage || 'Failed to remove operation. Please try again.'
      );
      return error;
    } finally {
      setDeletingOperationStatus((prevStatus) => ({
        ...prevStatus,
        [operationId]: false,
      }));
    }
  };

  const updateOperations = (operations) => {
    setOperationsState(operations);
    setIsAddOperation(false);
  };

  const handleClearDataset = (e) => {
    e.preventDefault();
    setConfirmClear(!confirmClear);
  };

  // clearDataset
  const clearDataset = async () => {
    setDeleting(true);
    let url = `admin/subcategories/${datasetId}/data_records`;
    const token = getUserFromLocalStorage().token;
    try {
      const response = await customFetch.delete(url, header(token));
      const responseData = response.data.data;
      toast.success('Dataset cleared successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return { dataset: responseData };
    } catch (error) {
      const errorMessage = flattenErrorMessage(error.response.data?.data);
      toast.error(errorMessage || 'Failed to clear dataset. Please try again.');
      return error;
    } finally {
      setDeleting(false);
    }
  };

  if (isModalOpen) {
    return <Upload onClose={openCloseModal} datasetId={datasetId} />;
  }

  if (isAddOperation) {
    return (
      <AddOperation
        onClose={handleAddOperation}
        datasetId={datasetId}
        updateOperations={updateOperations}
      />
    );
  }

  if (isAddVariable) {
    return <AddVariable onClose={handleAddVariable} datasetId={datasetId} />;
  }

  if (isUpdateVariable) {
    return (
      <EditDatasetVariable
        onClose={handleUpdateVariable}
        initialData={editData}
        datasetId={datasetId}
        // updateVariable={updateVariable}
      />
    );
  }

  if (confirmClear) {
    return (
      <Confirm
        onClose={handleClearDataset}
        message="Are you sure you want to clear this dataset?"
        onConfirm={clearDataset}
        deleting={deleting}
      />
    );
  }

  console.log('variablesState', variablesState);

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
            {Object.keys(dataRecord).length <= 0 ? (
              <button
                className="bg-primary-400 text-white font-medium text-sm rounded-md px-3 py-2 hover:bg-primary-700"
                onClick={openCloseModal}
              >
                Upload dataset
              </button>
            ) : (
              <button
                className="bg-red-500 text-white font-medium text-sm rounded-md px-3 py-2 hover:bg-red-700"
                onClick={(e) => handleClearDataset(e)}
              >
                Clear dataset
              </button>
            )}

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
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">
          {name}
        </h1>
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
            />
            <span className="text-sm">Add variable</span>
          </div>
        </div>
        <div className="border border-primary-100 rounded-lg p-1 mb-12">
          <table className="w-full text-sm text-left text-slate-500 dark:text-gray-400 ">
            <thead className="text-xs text-slate-800 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  Variables
                </th>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  First Column
                </th>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  Chart Data
                </th>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  Chart Label
                </th>
                <th scope="col" className="px-6 py-3 border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {variablesState.map((variable) => (
                <tr key={variable.id} className="border-b border-gray-300">
                  <td className="px-6 py-4">{variable.variable}</td>
                  <td className="px-6 py-4">
                    {variable.firstColumn.toString()}
                  </td>
                  <td className="px-6 py-4">{variable.charData.toString()}</td>
                  <td className="px-6 py-4">
                    {variable.chartLabel.toString()}
                  </td>

                  <td className="px-6 py-4 flex items-center">
                    {/* edit */}
                    <span
                      className="mr-2 cursor-pointer"
                      onClick={(e) => handleUpdateVariable(e, variable)}
                    >
                      <FaEdit className="mr-1" />
                    </span>
                    {/* remove */}

                    {deletingStatus[variable.id] ? (
                      <span className="mr-2 text-red-600">Deleting...</span>
                    ) : (
                      <span
                        className="mr-2 text-red-600 cursor-pointer"
                        onClick={(e) => handleDeleteVariable(e, variable.id)}
                      >
                        <FaTrash />
                      </span>
                    )}
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
            <thead className="text-xs text-slate-800 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3 border-gray-300">
                  Name
                </th>
                <th scope="col" className="px-6 py-3  border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {operationsState.map((operation) => (
                <tr key={operation.id} className="bg-white border-b">
                  <td className="px-6 py-4">{operation.operation}</td>
                  <td className="px-6 py-4 flex items-center">
                    {deletingOperationStatus[operation.id] ? (
                      <span className="mr-2 text-red-600">Deleting...</span>
                    ) : (
                      <span
                        className="mr-2 text-red-600 cursor-pointer"
                        onClick={(e) => handleDeleteOperation(e, operation.id)}
                      >
                        <FaTrash />
                      </span>
                    )}
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
