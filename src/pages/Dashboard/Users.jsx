import { useLoaderData } from 'react-router-dom';
import { UsersTable } from './components';

import {
  customFetchMarket,
  header,
  getUserFromLocalStorage,
} from '../../utils';

const url = '/admin/users';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetchMarket(url, header(token));
    const responseData = await response.data.data;

    return { users: responseData };
  } catch (error) {
    return error;
  }
};

const Users = () => {
  const { users } = useLoaderData();
  return (
    <div className="admin-container container-with-sidebar">
      <UsersTable usersList={users} />
    </div>
  );
};

export default Users;
