import PropTypes from 'prop-types';

const Table = ({ data }) => {
  // Extract variables and dataRecords from the data prop
  const { variables, dataRecord } = data;

  return (
    <div style={{ height: '830px' }}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {variables.map((variable) => (
              <th key={variable.id} scope="col" className="px-6 py-3">
                {variable.variable}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(dataRecord).map((recordKey) => (
            <tr
              key={recordKey}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              {variables.map((variable) => (
                <td key={variable.id} className="px-6 py-4">
                  {
                    dataRecord[recordKey].find(
                      (item) => item.variable === variable.variable
                    )?.data
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Table;
