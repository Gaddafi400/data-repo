// import PropTypes from 'prop-types';
// import { Pie } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [50, 30, 60, 70, 40],
//       backgroundColor: [
//         getRandomColor(),
//         getRandomColor(),
//         getRandomColor(),
//         getRandomColor(),
//         getRandomColor(),
//       ],
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

// const PieChart = ({ cData }) => {
//   return <Pie data={cData} />;
// };

// PieChart.propTypes = {
//   cData: PropTypes.object,
// };

// export default PieChart;

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const options = {
//   title: {
//     text: 'My chart',
//   },
//   series: [
//     {
//       data: [1, 2, 3],
//     },
//   ],
// };

// const PieChart = () => (
//   <div>
//     <HighchartsReact highcharts={Highcharts} options={options} />
//   </div>
// );

// export default PieChart;

import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const PieChart = ({ hData, label }) => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      width: 1000, // Set the width of the chart (in pixels)
      height: 650, // Set the height of the chart (in pixels)
      borderWidth: 1,
      borderColor: 'gray',
    },
    title: {
      text: label,
      align: 'center',
      style: {
        color: 'black',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        color: 'black',
        fontSize: '14px',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: 'black',
            fontSize: '12px',
          },
        },
        innerSize: '60%', // Adjust the inner size as needed
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadSVG'],
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: hData,
      },
    ],
    legend: {
      itemStyle: {
        color: 'black',
        fontSize: '14px',
      },
    },
    colors: [
      '#0077B6',
      '#00A88E',
      '#005465',
      '#33FF33',
      '#FF6633',
      '#ff33a081',
    ],
  };

  return (
    <div className="">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

PieChart.propTypes = {
  hData: PropTypes.array,
  label: PropTypes.string,
};

export default PieChart;
