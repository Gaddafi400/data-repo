import { useLoaderData } from 'react-router-dom';

import { LocalGovTable } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

const url = '/admin/lgas';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;

    return { localGov: responseData };
  } catch (error) {
    return error;
  }
};

const LocalGov = () => {
  const { localGov } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <LocalGovTable items={localGov} />
    </div>
  );
};

export default LocalGov;
