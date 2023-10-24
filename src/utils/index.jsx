import axios from 'axios';

export const header = (bearerToken) => {
  return {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
};

const baseUrl = 'https://backend1.steadyvariables.com/data/api';

export const customFetch = axios.create({
  baseURL: baseUrl,
});

const marketFinder = 'https://backend1.steadyvariables.com/market/api';

export const customFetchMarket = axios.create({
  baseURL: marketFinder,
});

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const flattenErrorMessage = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => flattenErrorMessage(item)).join(' ');
  } else if (typeof data === 'object') {
    return Object.values(data)
      .map((item) => flattenErrorMessage(item))
      .join(' ');
  } else {
    return data;
  }
};

export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// transform data
const convertToNumber = (value) => (value ? 1 : 0);

export const transformData = (originalData) => ({
  category: originalData.category,
  name: originalData.name,
  description: originalData.description,
  variables: originalData.variables.map((variable) => {
    const variableOptions = variable.variableOptions.reduce((acc, option) => {
      acc[option.name] = convertToNumber(option.selected);
      return acc;
    }, {});

    return {
      variable: variable.variable,
      ...variableOptions,
    };
  }),
});

export const extractLabelsAndData = (chartLabel, chartData, label) => {
  const labels = [];
  const data = [];
  const backgroundColors = [];

  for (const key in chartLabel) {
    if (Object.prototype.hasOwnProperty.call(chartLabel, key)) {
      const label = chartLabel[key];
      const dataPoint = chartData[key] || '';
      labels.push(label);
      data.push(dataPoint);
      backgroundColors.push(getRandomColor());
    }
  }
  const cData = {
    labels: labels,
    datasets: [
      {
        label: `${label}`,
        data: data,
        backgroundColor: backgroundColors,
        borderColor: '#21213e',
        borderWidth: 1,
      },
    ],
  };

  return cData;
};

export const formatDataHeightChart = (chartLabel, chartData) => {
  const labels = [];
  const data = [];

  for (const key in chartLabel) {
    if (Object.prototype.hasOwnProperty.call(chartLabel, key)) {
      const label = chartLabel[key];
      const dataPoint = chartData[key] || '';

      const dataValue = parseFloat(dataPoint, 10);

      labels.push(label);
      data.push(dataValue);
    }
  }

  const mappedData = labels.map((label, index) => ({
    name: label,
    y: data[index],
  }));

  // Find the index of the data point with the largest value
  const maxIndex = data.indexOf(Math.max(...data));

  if (maxIndex !== -1) {
    mappedData[maxIndex].sliced = true;
    mappedData[maxIndex].selected = true;
  }

  return mappedData;
};
