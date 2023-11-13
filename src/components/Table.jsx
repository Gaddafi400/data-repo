// import PropTypes from 'prop-types';

// const Table = ({ data }) => {
//   // Extract variables and dataRecords from the data prop
//   const { variables, dataRecord } = data;

//   return (
//     <div style={{ height: '830px' }}>
//       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             {variables.map((variable) => (
//               <th key={variable.id} scope="col" className="px-6 py-3">
//                 {variable.variable}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(dataRecord).map((recordKey) => (
//             <tr
//               key={recordKey}
//               className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
//             >
//               {variables.map((variable) => (
//                 <td key={variable.id} className="px-6 py-4">
//                   {
//                     dataRecord[recordKey].find(
//                       (item) => item.variable === variable.variable
//                     )?.data
//                   }
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// Table.propTypes = {
//   data: PropTypes.object.isRequired,
// };

// export default Table;

import PropTypes from 'prop-types';

const Table = ({ data }) => {
  // Extract variables and dataRecords from the data prop
  const { variables, dataRecord } = data;

  // Find the variable that should be used as the first column
  const firstColumnVariable = variables.find(
    (variable) => variable.firstColumn
  );
  
  console.log('firstColumnVariable', firstColumnVariable)


  // Sort the data based on the first column variable
  const sortedData = Object.keys(dataRecord).sort((a, b) => {
    const aValue = dataRecord[a]?.find((item) => item.variable === firstColumnVariable?.variable).data;
    const bValue = dataRecord[b]?.find((item) => item.variable === firstColumnVariable?.variable).data;
    return aValue.localeCompare(bValue);
  });

  return (
    <div className="max-h-[830px] ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto rounded-lg">
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
          {sortedData.map((recordKey) => (
            <tr
              key={recordKey}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              {variables.map((variable) => (
                <td key={variable.id} className="px-6 py-4">
                  {
                    dataRecord[recordKey].find(
                      (item) => item.variable === variable.variable
                    ).data
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
