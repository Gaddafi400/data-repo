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
