import { useLoaderData, redirect } from 'react-router-dom';
import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

import commodity from '../../assets/commodity.png';
import market from '../../assets/market.png';
import towns from '../../assets/towns.png';
import state from '../../assets/state.png';
import lga from '../../assets/lga.png';
import users from '../../assets/users.png';

const url = '/admin/index';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;
  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;

    return { dashboard: responseData };
  } catch (error) {
    if (error.response.status === 401) {
      return redirect('/login');
    }
    return error;
  }
};

const Dashboard = () => {
  const { dashboard } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <div>
        <h2 className="font-bold sm:text-3xl text-2xl">Dashboard</h2>
        <hr className="border-t-2 border-primary-600 mt-2" />
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-2 py-24 mx-auto">
          <div className="flex flex-col w-full mb-4">
            <h1 className="sm:text-2xl text-1xl font-medium">Key indicators</h1>
          </div>
          <div className="flex flex-wrap -m-4 text-center  cursor-pointer">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg  bg-primary-50">
                <img
                  src={towns}
                  alt="towns"
                  className="w-12 h-12 mb-3 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.towns}
                </h2>
                <p className="leading-relaxed text-gray-900">Towns</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg ">
                <img
                  src={market}
                  alt="market"
                  className="text-primary-600 w-12 h-12 mb-3 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.markets}
                </h2>
                <p className="leading-relaxed">Markets</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg  bg-primary-50">
                <img
                  src={commodity}
                  alt="commodity"
                  className="w-12 h-12 mb-3 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.commodities}
                </h2>
                <p className="leading-relaxed text-gray-900">Commodities</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg ">
                <img
                  src={state}
                  alt="state"
                  className="w-12 h-12 mb-3 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.states}
                </h2>
                <p className="leading-relaxed ">States</p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg ">
                <img
                  src={lga}
                  alt="lga"
                  className="w-12 h-12 mb-3 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.lgas}
                </h2>
                <p className="leading-relaxed ">LGA</p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg  bg-primary-50">
                <img
                  src={users}
                  alt="users"
                  className="w-14 h-14 mb-2 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.users?.length}
                </h2>
                <p className="leading-relaxed ">Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
