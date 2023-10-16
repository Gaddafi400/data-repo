import { useLoaderData } from 'react-router-dom';
import { StateTable } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

const url = '/admin/states';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;

    return { state: responseData };
  } catch (error) {
    return error;
  }
};

const State = () => {
  const { state } = useLoaderData();

  return (
    <div className="align-element">
      <StateTable items={state} />
    </div>
  );
};

export default State;
