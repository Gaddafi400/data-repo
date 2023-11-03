import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const BarChart = ({ hData, label }) => {
  // Define an array of fixed predefined colors
  const fixedColors = [
    '#0077B6',
    '#00A88E',
    '#005465',
    '#33FF33',
    '#FF6633',
    '#ff33a081',
    '#4caefe',
    '#3dc3e8',
    '#2dd9db',
    '#1feeaf',
    '#0ff3a0',
    '#00e887',
    '#23e274',
  ];

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      width: 1200,
      height: 710,
    },
    title: {
      text: label,
      align: 'center',
      style: {
        color: 'black',
        fontSize: '20px',
        opacity: 0.8,
      },
    },
    xAxis: {
      categories: hData.map((item) => item.name),
      labels: {
        style: {
          color: 'black',
          fontSize: '12px',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Value',
        style: {
          color: 'black',
          fontSize: '12px',
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
      bar: {
        pointPadding: 0.3,
        groupPadding: 0.3,
        borderRadius: 5,
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
          menuItems: [
            'downloadPNG',
            'downloadJPEG',
            'downloadSVG',
            'downloadPDF',
          ],
        },
      },
    },
    series: [
      {
        name: 'Values',
        data: hData.map((item, index) => ({
          y: item.y,
          color: fixedColors[index % fixedColors.length], // Assign a fixed color based on index
        })),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

BarChart.propTypes = {
  hData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      y: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

export default BarChart;
