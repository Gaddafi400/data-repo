import { useLoaderData } from 'react-router-dom';
import { OperationTable } from './components';

import { customFetch, header, getUserFromLocalStorage } from '../../utils';

const url = '/admin/operations';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
    return { operation: responseData };
  } catch (error) {
    return error;
  }
};

const Operation = () => {
  const { operation } = useLoaderData();

  return (
    <div className="align-element">
      <OperationTable items={operation} />
    </div>
  );
};

export default Operation;
