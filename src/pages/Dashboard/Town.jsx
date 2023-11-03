import { useLoaderData, redirect } from 'react-router-dom';
import { TownTable } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

const url = '/admin/towns';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;

    return { towns: responseData };
  } catch (error) {
    if (error.response.status === 401) {
      return redirect('/login');
    }
    return error;
  }
};

const Town = () => {
  const { towns } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <TownTable items={towns} />
    </div>
  );
};

export default Town;
