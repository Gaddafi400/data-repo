import { useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { AddCommodity } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

let marketId = '';

export const loader = async ({ params }) => {
  const token = getUserFromLocalStorage().token;
  marketId = params.id;
  try {
    const url = '/admin/markets';
    const response = await customFetchMarket(
      `${url}/${params.id}`,
      header(token)
    );
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

const SingleMarket = () => {
  const { singleRecord } = useLoaderData();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isModalOpen) {
    return (
      <AddCommodity
        onClose={openCloseModal}
        marketId={marketId}
        marketName={singleRecord?.name}
      />
    );
  }

  return (
    <div className="admin-container container-with-sidebar">
      <div className="bg-white p-6 rounded-lg shadow">
        <button
          className=" text-white bg-primary-400 hover:bg-primary-700 font-medium rounded-md text-sm px-4 py-2 flex items-center"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="inline mr-2" /> Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 my-4">
            Market Data
          </h1>

          <button
            className="block text-white bg-primary-400 hover:bg-primary-700 font-medium rounded-md text-sm px-4 py-3 text-center"
            type="button"
            onClick={() => openCloseModal()}
          >
            Add Commodity
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Market Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">
                <strong>Name:</strong>
              </p>
              <p>{singleRecord.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>State:</strong>
              </p>
              <p>{singleRecord.state?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Local Government:</strong>
              </p>
              <p>{singleRecord.lga?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Town:</strong>
              </p>
              <p>{singleRecord.town?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Address:</strong>
              </p>
              <p>{singleRecord.address}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Landmark:</strong>
              </p>
              <p>{singleRecord.landmark}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Alias:</strong>
              </p>
              <p>{singleRecord.alias}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Longitude:</strong>
              </p>
              <p>{singleRecord.longitude}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Latitude:</strong>
              </p>
              <p>{singleRecord.latitude}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Active Days</h2>
          <p className="text-sm text-slate-600">
            <strong>Selected Active Days:</strong>
          </p>
          <p>{singleRecord.activeDays.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMarket;
