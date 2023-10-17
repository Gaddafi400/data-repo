import { Navbar, Footer, Heading } from '../components';
import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { useState, useEffect } from 'react';

import xlsx from '../assets/xlsx.png';
import jpeg from '../assets/jpeg.png';
import pdf from '../assets/pdf.png';
import Table from '../components/Table';

import BarChart from '../components/chart/BarChart';
import PieChart from '../components/chart/PieChart';
import LineChart from '../components/chart/LineChart';
import BubbleChart from '../components/chart/BubbleChart';

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
  const [chartType, setChartType] = useState('PieChart');

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
            onClick={() => handleItemClick('Charts')}
          >
            Chart
          </li>
          {/* Add more sidebar items here */}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="data-set-hero h-[100px]">
        <div className="w-full xx:w-[1518px] flex items-center xl:px-12">
          <Heading text="Home" />
          <Heading text="Data Sets" />
          <Heading text={result?.category} />
        </div>
        <div className="w-full xx:w-[1518px] h-[292px] bg-white rounded-[25px]">
          <p className="p-14 text-zinc-500" style={{ fontSize: '18px' }}>
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
            <div className="w-full md:w-3/0 sm:p-0 md:pl-12">
              {/* Always show the table */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* Table content goes here */}
                {selectedItem === 'table' && <Table data={result} />}
              </div>
              {/* Add conditionals for other components */}

              {selectedItem === 'Charts' && (
                <div className="bg-white h-full p-4 rounded-lg">
                  <div className="chart-container">
                    {/* display chart here base on the button click under the container */}
                    {chartType === 'BarChart' ? <BarChart /> : ''}
                    {chartType === 'PieChart' ? <PieChart /> : ''}
                    {chartType === 'LineChart' ? <LineChart /> : ''}
                    {chartType === 'BubbleChart' ? <BubbleChart /> : ''}
                  </div>

                  <div className="flex justify-between align-items-center px-5">
                    <button
                      className="btn border border-primary-500 px-6"
                      onClick={() => setChartType('PieChart')}
                    >
                      Pie Chart
                    </button>
                    <button
                      className="btn border-primary-500 px-6"
                      onClick={() => setChartType('BarChart')}
                    >
                      Bar Chart
                    </button>
                    <button
                      className="btn border-primary-500 px-6"
                      onClick={() => setChartType('LineChart')}
                    >
                      Line Chart
                    </button>
                    <button
                      className="btn border-primary-500 px-6"
                      onClick={() => setChartType('BubbleChart')}
                    >
                      Bubble Chart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SingleData;
