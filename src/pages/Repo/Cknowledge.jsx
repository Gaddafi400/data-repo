import { useLoaderData } from 'react-router-dom';
import { CknowledgeTable } from './components';

import { customFetch, header, getUserFromLocalStorage } from '../../utils';

const url = '/admin/knowledge';

export const loader = async () => {
  const token = getUserFromLocalStorage().token;

  try {
    const response = await customFetch(url, header(token));
    const responseData = await response.data.data;
      console.log(responseData);
      
    return { cKnowledge: responseData };
  } catch (error) {
    return error;
  }
};

const Cknowledge = () => {
  const { cKnowledge } = useLoaderData();

  return (
    <div className="align-element">
      <CknowledgeTable items={cKnowledge} />
    </div>
  );
};

export default Cknowledge;


 