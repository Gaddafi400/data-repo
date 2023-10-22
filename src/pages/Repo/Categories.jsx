import { useLoaderData } from 'react-router-dom';
import { CategoriesTable } from './components';

import { customFetch, header, getUserFromLocalStorage } from '../../utils';

export const loader = async () => {
  const url = '/admin/data-category';
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
    return { categories: responseData };
  } catch (error) {
    return error;
  }
};

const Categories = () => {
  const { categories } = useLoaderData();

  return (
    <div className="admin-container container-with-sidebar">
      <CategoriesTable items={categories} />
    </div>
  );
};

export default Categories;
