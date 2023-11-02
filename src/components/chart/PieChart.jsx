import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';

// Initialize the exporting module
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const PieChart = ({ hData, label }) => {
 
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true,
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
            color: '#333',
            fontSize: '12px',
          },
          distance: 10,
          allowOverlap: true,
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
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadSVG'],
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
    colors: [
      '#0077B6',
      '#00A88E',
      '#005465',
      '#33FF33',
      '#FF6633',
      '#ff33a081',
    ],
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
};

export default PieChart;
