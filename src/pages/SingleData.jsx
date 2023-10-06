import { Navbar, Footer, Heading } from '../components';
import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { useState, useEffect } from 'react';

import xlsx from '../assets/xlsx.png';
import jpeg from '../assets/jpeg.png';
import pdf from '../assets/pdf.png';

export const loader = async ({ params }) => {
  try {
    const url = '/guest/subcategories';
    const response = await customFetch(`${url}/${params.id}`);
    console.log(response);

    return { result: response.data.data };
  } catch (error) {
    return error;
  }
};

const SingleData = () => {
  const { result } = useLoaderData();
  const [selectedItem, setSelectedItem] = useState('table');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than a mobile breakpoint (e.g., 640px)
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSidebar = () => {
    if (isMobile) {
      // Render nothing on mobile
      return null;
    }

    // Render the sidebar on larger screens
    return (
      <div className="w-1/6 bg-gray-100 p-4 rounded-lg h-[830px]">
        <h2 className="text-lg font-semibold mb-4">Data Analysis</h2>
        <ul>
          <li
            className={`cursor-pointer ${
              selectedItem === 'table' ? 'text-blue-500' : ''
            }`}
            onClick={() => handleItemClick('table')}
          >
            Table
          </li>
          <li
            className={`cursor-pointer ${
              selectedItem === 'otherComponent' ? 'text-blue-500' : ''
            }`}
            onClick={() => handleItemClick('otherComponent')}
          >
            Other Component
          </li>
          {/* Add more sidebar items here */}
        </ul>
      </div>
    );
  };

  // console.log('results', result);
  return (
    <>
      <Navbar />
      <div className="data-set-hero h-[100px]">
        <div className="w-full xx:w-[1518px] flex items-center xl:px-12">
          <Heading text="Home" />
          <Heading text="Data Sets" />
          <Heading text="Population" />
        </div>
        <div className="w-full xx:w-[1518px] h-[292px] bg-white rounded-[25px]">
          <p className="p-4 text-zinc-500 text-1xl font-medium ">
            {result?.description}
          </p>
        </div>
      </div>

      <div className="export w-full xx:w-[1518px]">
        <div className="flex ">
          <img src={pdf} alt="pdf" />
          <img src={xlsx} alt="xlsx" />
          <img src={jpeg} alt="jpeg" />
        </div>
      </div>

      <div className="data-section-container px-2">
        <section className="data-section w-full xx:w-[1518px] rounded-[30px] p-6">
          <div className="flex">
            {/* Render the sidebar */}
            {renderSidebar()}

            {/* Right Content */}
            <div className="w-full md:w-3/0 px-12">
              {/* Always show the table */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* Table content goes here */}
                {selectedItem === 'table' && (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">Silver</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">$2999</td>
                      </tr>
                      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Microsoft Surface Pro
                        </th>
                        <td className="px-6 py-4">White</td>
                        <td className="px-6 py-4">Laptop PC</td>
                        <td className="px-6 py-4">$1999</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Magic Mouse 2
                        </th>
                        <td className="px-6 py-4">Black</td>
                        <td className="px-6 py-4">Accessories</td>
                        <td className="px-6 py-4">$99</td>
                      </tr>
                      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Google Pixel Phone
                        </th>
                        <td className="px-6 py-4">Gray</td>
                        <td className="px-6 py-4">Phone</td>
                        <td className="px-6 py-4">$799</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
              {/* Add conditionals for other components */}
              {isMobile && selectedItem === 'otherComponent' && (
                <div>{/* Content for 'otherComponent' on mobile */}</div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* <div className="data-section-container"></div> */}
      <Footer />
    </>
  );
};

export default SingleData;
