import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const LineChart = ({ hData, label, backgroundColors }) => {
  // Define an array of fixed predefined colors
  const fixedColors = backgroundColors;

  const options = {
    chart: {
      type: 'line',
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
      title: {
        text: 'Year',
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
    yAxis: {
      title: {
        text: 'Rate of Change',
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
            fontSize: '12px',
          },
        },
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            'viewFullscreen',
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
          color: fixedColors[index % fixedColors.length],
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

LineChart.propTypes = {
  hData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      y: PropTypes.number,
    })
  ),
  label: PropTypes.string,
  backgroundColors: PropTypes.array,
};

export default LineChart;
