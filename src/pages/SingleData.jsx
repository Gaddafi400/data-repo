import { Navbar, Footer } from '../components';
import { useLoaderData } from 'react-router-dom';
import { customFetch, formatDataHeightChart } from '../utils';
import { useState } from 'react';

import xlsx from '../assets/xlsx.png';
import jpeg from '../assets/jpeg.png';
import pdf from '../assets/pdf.png';

import BarChart from '../components/chart/BarChart';
import PieChart from '../components/chart/PieChart';
import AreaChart from '../components/chart/AreaChart';
import BubbleChart from '../components/chart/BubbleChart';
import OperationChart from '../components/chart/OperationChart';

export const loader = async ({ params }) => {
  try {
    const url = '/guest/subcategories';
    const response = await customFetch(`${url}/${params.id}`);

    return {
      result: response.data.data?.dataset,
      chartLabel: response.data.data?.chartLabel,
      chartData: response.data.data?.chartData,
      operations: response.data.data?.operations,
    };
  } catch (error) {
    return error;
  }
};

const SingleData = () => {
  const { result, operations, chartLabel, chartData } = useLoaderData();

  const [selectedItem, setSelectedItem] = useState('charts');

  const [chartType, setChartType] = useState('PieChart');

  const hData = formatDataHeightChart(chartLabel, chartData);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSidebar = () => {
    return (
      <div className="min-w-[180px] bg-gray-100 p-4 rounded-lg h-[830px]">
        <h2 className="text-lg font-semibold mb-4">Data Analysis</h2>
        <ul>
          <li
            className={`cursor-pointer mb-2 ${
              selectedItem === 'charts'
                ? 'text-primary-800 bg-primary-50 text-center rounded-md'
                : ''
            }`}
            onClick={() => handleItemClick('charts')}
          >
            Chart
          </li>

          {operations && Object.keys(operations).length > 0 ? (
            <li
              className={`cursor-pointer mb-2 ${
                selectedItem === 'operation'
                  ? 'text-primary-800 bg-primary-50 text-center rounded-md'
                  : ''
              }`}
              onClick={() => handleItemClick('operation')}
            >
              Operation
            </li>
          ) : null}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="data-set-hero min-h-[490px]">
        <div className="w-full xx:w-[1518px] min-h-[292px] bordered bg-white rounded-2xl">
          <p className="py-8 px-6 text-zinc-700 text-lg">
            {result?.description}
          </p>
        </div>
      </div>

      <div className="export w-full xx:w-[1518px]">
        <div className="flex ">
          <img src={pdf} alt="pdf" width="50px" height="10px" />
          <img src={xlsx} alt="xlsx" width="50px" height="10px" />
          <img src={jpeg} alt="jpeg" width="50px" height="10px" />
        </div>
      </div>

      <div className="data-section-container px-2">
        <section className="data-section w-full xx:w-[1518px] rounded-[30px] p-6 overflow-scroll">
          <div className="flex">
            {/* Render the sidebar */}
            {renderSidebar()}

            {/* Right Content */}
            <div
              className="w-full md:w-3/0 sm:p-0  min-h-[830px]"
              style={{ marginLeft: '1rem' }}
            >
              {/* Always show the chart first */}
              <div className="relative overflow-x-auto shadow-md rounded-lg min-w-[1270px]">
                {/* Table content goes here */}
                {/* {selectedItem === 'table' && <Table data={result} />} */}
              </div>
              {/* Add conditionals for other components */}
              {selectedItem === 'charts' && (
                <div className="bg-white h-full p-4 rounded-lg overflow-none">
                  <div className="chart-container">
                    {/* display chart here base on the button click under the container */}
                    {chartType === 'BarChart' ? (
                      <BarChart
                        hData={hData.mappedData}
                        backgroundColors={hData.backgroundColors}
                        label={result?.name}
                      />
                    ) : (
                      ''
                    )}
                    {chartType === 'PieChart' ? (
                      <PieChart
                        hData={hData.mappedData}
                        backgroundColors={hData.backgroundColors}
                        label={result?.name}
                      />
                    ) : (
                      ''
                    )}
                    {chartType === 'AreaChart' ? (
                      <AreaChart
                        backgroundColors={hData.backgroundColors}
                        hData={hData.mappedData}
                        label={result?.name}
                      />
                    ) : (
                      ''
                    )}
                    {chartType === 'BubbleChart' ? (
                      <BubbleChart
                        backgroundColors={hData.backgroundColors}
                        hData={hData.mappedData}
                        label={result?.name}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="flex justify-between align-items-center px-5 min-w-[1200px]">
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
                      onClick={() => setChartType('AreaChart')}
                    >
                      Area Chart
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
              {selectedItem === 'operation' && (
                <div className="bg-white h-full p-4 rounded-lg w-full">
                  <h1 className="text-2xl font-medium mb-4">Operations</h1>

                  <OperationChart
                    title={result?.name}
                    mean={parseInt(operations.mean)}
                    median={parseInt(operations.median)}
                    mode={parseInt(operations.mode[1])}
                  />
                  {/* <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg">
                      <h2 className="text-xl font-semibold">Mean</h2>
                      <p>
                        {operations.mean !== null
                          ? parseFloat(operations.mean).toFixed(2)
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="border p-4 rounded-lg">
                      <h2 className="text-xl font-semibold">Mode</h2>
                      <p>
                        {operations.mode !== null
                          ? parseFloat(operations.mode).toFixed(2)
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="border p-4 rounded-lg">
                      <h2 className="text-xl font-semibold">Median</h2>
                      <p>
                        {operations.median !== null
                          ? parseFloat(operations.median).toFixed(2)
                          : 'N/A'}
                      </p>
                    </div>
                  </div> */}
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
