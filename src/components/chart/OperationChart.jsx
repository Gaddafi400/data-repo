import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getRandomColor } from '../../utils';

const OperationChart = ({ title, mean, median, mode }) => {
  const colors = [getRandomColor(), getRandomColor(), getRandomColor()];

  const options = {
    chart: {
      type: 'bar',
      width: 1200,
      height: 710,
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: ['Mean', 'Median', 'Mode'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    plotOptions: {
      series: {
        colorByPoint: true,
      },
    },
    series: [
      {
        data: [mean, median, mode],
        color: colors,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
OperationChart.propTypes = {
  title: PropTypes.string,
  mean: PropTypes.number.isRequired,
  median: PropTypes.number.isRequired,
  mode: PropTypes.number.isRequired,
  //   mode: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.arrayOf(PropTypes.string),
  //   ]).isRequired,
};

export default OperationChart;
