import { FiLayers, FiBox, FiDatabase, FiBookOpen } from 'react-icons/fi';

import { useLoaderData } from 'react-router-dom';

import { customFetch, header, getUserFromLocalStorage } from '../../utils';

import subscribers from '../../assets/subscribe.png';

const url = '/admin/index';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;
  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
    console.log(responseData);

    return { dashboard: responseData };
  } catch (error) {
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
                <FiLayers className="text-primary-600 w-12 h-12 mb-3 inline-block" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.variables}
                </h2>
                <p className="leading-relaxed text-gray-900">Variables</p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg ">
                <FiBox className="text-primary-600 w-12 h-12 mb-3 inline-block" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.category}
                </h2>
                <p className="leading-relaxed">Categories</p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg  bg-primary-50">
                <FiBookOpen className="text-primary-600 w-12 h-12 mb-3 inline-block" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.commonKnowledge}
                </h2>
                <p className="leading-relaxed text-gray-900">
                  Common Knowledge
                </p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg ">
                <FiDatabase className="text-primary-600 w-12 h-12 mb-3 inline-block" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.datasets}
                </h2>
                <p className="leading-relaxed ">Dataset</p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-primary-50">
                <img
                  src={subscribers}
                  alt="subscribers"
                  className="text-primary-600 w-14 h-14 mb-3 inline-block"
                />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {dashboard?.subscribers}
                </h2>
                <p className="leading-relaxed ">Subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
