import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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

const PieChart = ({ cData }) => {
  return <Pie data={cData} />;
};

PieChart.propTypes = {
  cData: PropTypes.object,
};

export default PieChart;
