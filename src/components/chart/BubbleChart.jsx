import PropTypes from 'prop-types';
import { Bubble } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const options = {
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
    },
    y: {
      type: 'linear',
      position: 'left',
    },
  },
};

const BubbleChart = ({ cData }) => {
  return <Bubble data={cData} options={options} />;
};

BubbleChart.propTypes = {
  cData: PropTypes.oneOfType([PropTypes.object]),
};

export default BubbleChart;
