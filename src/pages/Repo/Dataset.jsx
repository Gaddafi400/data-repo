import { useLoaderData } from 'react-router-dom';
import { DatasetTable } from './components';

import { customFetch, header, getUserFromLocalStorage } from '../../utils';

const url = '/admin/subcategories';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
    console.log(responseData);
    return { dataset: responseData };
  } catch (error) {
    return error;
  }
};

const Dataset = () => {
  const { dataset } = useLoaderData();

  return (
    <div className="align-element">
      <DatasetTable items={dataset} />
    </div>
  );
};

export default Dataset;
