import { useLoaderData } from 'react-router-dom';
import { VariableTable } from './components';

import { customFetch, header, getUserFromLocalStorage } from '../../utils';

const url = '/admin/variables';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
    return { variables: responseData };
  } catch (error) {
    return error;
  }
};

const Variable = () => {
  const { variables } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <VariableTable items={variables} />
    </div>
  );
};

export default Variable;
