import { useLoaderData } from 'react-router-dom';
import { customFetch, header, getUserFromLocalStorage } from '../../utils';
import Table from '../../components/Table';

export const loader = async ({ params }) => {
  const token = getUserFromLocalStorage().token;
  try {
    const url = '/admin/subcategories';
    const response = await customFetch(`${url}/${params.id}`, header(token));
    console.log('response +++++++', response);
    return {
      singleRecord: response.data.data,
    };
  } catch (error) {
    return error;
  }
};

const SingleDataset = () => {
  const { singleRecord } = useLoaderData();

  const { name, variables, category, description, dataRecord, operations } =
    singleRecord;

  const tableData = {
    variables,
    dataRecord,
  };

  return (
    <div className="align-element">
      <div className='mt-5'>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="text-lg text-gray-700 mb-4">{category}</p>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Variables */}
        <h2 className="text-xl font-semibold mb-2">Variables</h2>
        <ul className="list-disc pl-6 mb-4">
          {variables.map((variable) => (
            <li key={variable.id}>{variable.variable}</li>
          ))}
        </ul>

        {/* Operations */}
        <h2 className="text-xl font-semibold mb-2">Operations</h2>
        <ul className="list-disc pl-6 mb-4">
          {operations.map((operation) => (
            <li key={operation.id}>{operation.operation}</li>
          ))}
        </ul>

        {/* Data Records */}
        <div
          className="border border-primary-500 rounded-lg"
          style={{ maxHeight: '500px', overflowX: 'auto' }}
        >
          <Table data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default SingleDataset;
