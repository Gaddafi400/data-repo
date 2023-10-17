import { useLoaderData } from 'react-router-dom';
import { CommodityTable } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

const url = '/admin/commodities';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;
    return { towns: responseData };
  } catch (error) {
    return error;
  }
};

const Commodity = () => {
  const { towns } = useLoaderData();

  return (
    <div className="align-element">
      <CommodityTable items={towns} />
    </div>
  );
};

export default Commodity;
