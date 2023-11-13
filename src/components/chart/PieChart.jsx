import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import fullscreenInit from 'highcharts/modules/full-screen';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);
fullscreenInit(Highcharts);

const PieChart = ({ hData, label, backgroundColors }) => {
  const options = {
    chart: {
      type: 'pie',
      // backgroundColor: null,
      // plotBackgroundColor: null,
      // plotBorderWidth: null,
      // plotShadow: true,
      width: 1200,
      height: 700,
      borderWidth: 1,
      borderColor: 'gray',
    },
    title: {
      text: label,
      align: 'center',
      style: {
        color: '#333',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        color: '#333',
        fontSize: '16px',
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
            textOutline: 'none',
            opacity: 0.8,
          },
          distance: 20,
        },
        series: {
          dataGrouping: {
            enabled: false,
          },
        },

        innerSize: '65%', // Adjust the inner size as needed
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            'viewFullscreen',
            'separator',
            'downloadPNG',
            'downloadJPEG',
            'downloadSVG',
          ],
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
        color: '#333',
        fontSize: '14px',
      },
    },
    colors: backgroundColors,
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
  backgroundColors: PropTypes.array,
};

export default PieChart;
