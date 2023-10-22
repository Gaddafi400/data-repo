import { redirect, useLoaderData } from 'react-router-dom';
import { DatasetTable } from './components';

import {
  customFetch,
  header,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils';

const url = '/admin/subcategories';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
    return { dataset: responseData };
  } catch (error) {
    if (error.response.status === 401) {
      removeUserFromLocalStorage();
    }
    return error;
  }
};

const Dataset = () => {
  const { dataset } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <DatasetTable items={dataset} />
    </div>
  );
};

export default Dataset;

// align-element
