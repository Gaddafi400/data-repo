import axios from 'axios';

const baseUrl = 'https://backend1.steadyvariables.com/data/api';

export const customFetch = axios.create({
  baseURL: baseUrl,
});

const marketFinder = 'https://backend1.steadyvariables.com/market/api';

export const customFetchMarket = axios.create({
  baseURL: marketFinder,
});


