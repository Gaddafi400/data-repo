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
  ];

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      width: 1000,
      height: 700,
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
      bar: {
        pointPadding: 0.3,
        groupPadding: 0.3,
        borderRadius: 5,
        dataLabels: {
          enabled: true,
          style: {
            color: 'black',
            fontSize: '13px',
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
