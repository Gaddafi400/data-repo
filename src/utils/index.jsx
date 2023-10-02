import axios from 'axios';

const baseUrl = 'https://backend1.steadyvariables.com/data/api';

export const customFetch = axios.create({
  baseURL: baseUrl,
});
