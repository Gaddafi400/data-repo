import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const AreaChart = ({ hData, label }) => {
  const options = {
    chart: {
      type: 'area', // Change the chart type to 'area'
      backgroundColor: 'transparent',
      width: 1000,
      height: 720,
    },
    title: {
      text: label,
      align: 'left',
      style: {
        color: 'black',
        fontSize: '24px',
      },
    },
    xAxis: {
      categories: hData.map((item) => item.name),
      labels: {
        style: {
          color: 'black',
          fontSize: '14px',
        },
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: 'Value',
        style: {
          color: 'black',
          fontSize: '14px',
        },
      },
      labels: {
        style: {
          color: 'black',
          fontSize: '12px',
        },
      },
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5, // Adjust fill opacity for the area chart
        dataLabels: {
          enabled: true,
          style: {
            color: 'black',
            fontSize: '12px',
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
        name: 'Values',
        data: hData.map((item) => item.y),
        color: 'rgba(41, 41, 73, 0.5)', 
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

AreaChart.propTypes = {
  hData: PropTypes.array,
  label: PropTypes.string,
};

export default AreaChart;
