import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const BubbleChart = ({ hData, label }) => {
  const options = {
    chart: {
      type: 'scatter', // Set the chart type to 'scatter'
      backgroundColor: null,
      width: 1000, // Set the width of the chart (in pixels)
      height: 650, // Set the height of the chart (in pixels)
    },
    title: {
      text: label,
      align: 'left',
      style: {
        color: 'black', // Set the title text color to black
      },
    },
    xAxis: {
      title: {
        text: 'X-axis',
        style: {
          color: 'black', // Set the x-axis label color to black
        },
      },
    },
    yAxis: {
      title: {
        text: 'Y-axis',
        style: {
          color: 'black', // Set the y-axis label color to black
        },
      },
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 10, // Adjust the marker size to control the bubble appearance
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: 'rgba(41, 41, 73, 0.7)',
          },
        },
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
        name: label,
        data: hData,
        color: 'rgba(41, 41, 73, 0.9)',
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

BubbleChart.propTypes = {
  hData: PropTypes.array,
  label: PropTypes.string,
};

export default BubbleChart;
