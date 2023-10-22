import { useLoaderData } from 'react-router-dom';
import { MarketTable } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

const url = '/admin/markets/';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;
    return { markets: responseData };
  } catch (error) {
    return error;
  }
};

const Market = () => {
  const { markets } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <MarketTable items={markets} />
    </div>
  );
};

export default Market;
