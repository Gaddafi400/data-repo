import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Pagination from './Pagination';
import CreateMarket from './CreateMarket';
import EditMarket from './EditMarket';
import Confirm from './Confirm';

import {
  customFetchMarket,
  getUserFromLocalStorage,
  flattenErrorMessage,
  header,
} from '../../../utils';

const MarketTable = ({ items }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [markets, setMarkets] = useState(items);

  const totalItems = markets.length;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Filter items based on the search input
  const filteredMarkets = markets.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMarkets.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageNumbers.length) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMarkets.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onMarketCreated = (newMarket) => {
    setMarkets([...markets, newMarket]);
  };

  const openCloseEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleEdit = (item) => {
    setEditData(item);
    openCloseEditModal();
  };

  // update user state on edit
  const updateMarket = (editedMarket) => {
    const marketIndex = markets.findIndex(
      (user) => user.id === editedMarket.id
    );

    if (marketIndex !== -1) {
      // Create a new copy of the 'markets' array and replace the updated one
      const updatedMarkets = [...markets];
      updatedMarkets[marketIndex] = editedMarket;
      setMarkets(updatedMarkets);
    }
    openCloseEditModal();
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    setConfirmDelete(!confirmDelete);
  };

  // delete market
  const deleteMarket = async () => {
    if (deletingItemId) {
      let url = `/admin/markets/${deletingItemId}`;
      const token = getUserFromLocalStorage().token;

      setDeleting(true);
      try {
        const response = await customFetchMarket.delete(url, header(token));
        const responseData = response.data.data;
        toast.success('Market deleted successfully!');

        // Filter out the market with the specified ID from the 'markets' state
        const updatedMarkets = markets.filter(
          (user) => user.id !== deletingItemId
        );
        setMarkets(updatedMarkets);
        setDeletingItemId(null);

        // Check if the current page exceeds the new total number of pages to update pagination
        if (currentPage > Math.ceil(updatedMarkets.length / itemsPerPage)) {
          // If so, set the current page to the last page
          setCurrentPage(Math.ceil(updatedMarkets.length / itemsPerPage));
        }
        // close the modal
        setConfirmDelete(!confirmDelete);

        return { user: responseData };
      } catch (error) {
        const errorMessage = flattenErrorMessage(error.response.data?.data);
        toast.error(
          errorMessage || 'Failed to delete market. Please try again.'
        );
        return error;
      } finally {
        setDeleting(false);
      }
    }
  };


  if (confirmDelete) {
    return (
      <Confirm
        onClose={handleConfirmDelete}
        message="Are you sure you want to delete this market?"
        onConfirm={deleteMarket}
        deleting={deleting}
      />
    );
  }

  if (isModalOpen) {
    return (
      <CreateMarket
        onClose={openCloseModal}
        onMarketCreated={onMarketCreated}
      />
    );
  }

  if (isEditOpen) {
    return (
      <EditMarket
        onClose={openCloseEditModal}
        initialData={editData}
        updateMarket={updateMarket}
      />
    );
  }


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between items-center px-4 mt-2">
        <div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button
          className="block text-white bg-primary-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
          onClick={() => openCloseModal()}
        >
          Create Market
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>

            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Alias
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Local Gov&apos;ts
            </th>
            <th scope="col" className="px-6 py-3">
              town
            </th>
            <th scope="col" className="px-6 py-3">
              Number Of Commodities
            </th>
            <th scope="col" className="px-6 py-3">
              Longitude
            </th>
            <th scope="col" className="px-6 py-3">
              Latitude
            </th>

            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? 'bg-white'
                  : 'bg-white dark:bg-gray-800 dark:border-gray-700'
              } ${
                index === currentItems.length - 1
                  ? 'hover:bg-gray-50 dark:hover-bg-gray-600'
                  : 'hover:bg-gray-50 dark:hover-bg-gray-600 dark:hover-bg-gray-600'
              }`}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${index + 1}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${index + 1}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.alias}</td>
              <td className="px-6 py-4">{item.state?.name}</td>
              <td className="px-6 py-4">{item.lga?.name}</td>
              <td className="px-6 py-4">{item.town?.name}</td>
              <td className="px-6 py-4">{item.numberOfCommodities}</td>
              <td className="px-6 py-4">{item.longitude}</td>
              <td className="px-6 py-4">{item.latitude}</td>
              <td className="px-6 py-4 flex">
                <button
                  onClick={() => handleEdit(item)}
                  className="font-medium hover:underline flex items-center mr-3"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const targetUrl = `/dashboard/market/${item?.id}`;
                    navigate(targetUrl);
                  }}
                  className="font-medium hover:underline flex items-center mr-3"
                >
                  <FaEye className="mr-1" /> View
                </button>

                <button
                  className={`font-medium hover:underline flex items-center`}
                  onClick={(e) => {
                    handleConfirmDelete(e);
                    setDeletingItemId(item.id);
                  }}
                >
                  <FaTrash className="mr-1  animate-spin text-red-600" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers.length}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </div>
  );
};

MarketTable.propTypes = {
  items: PropTypes.array,
};

export default MarketTable;
