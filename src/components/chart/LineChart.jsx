import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [50, 30, 60, 70, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = ({ cData }) => {
  return <Line data={cData} options={options} />;
};

LineChart.propTypes = {
  cData: PropTypes.oneOfType([PropTypes.object]),
};

export default LineChart;
