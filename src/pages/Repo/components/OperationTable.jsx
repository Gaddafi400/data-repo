

import React from 'react'

const OperationTable = () => {
  return (
    <div>OperationTable</div>
  )
}

export default OperationTable


// import PropTypes from 'prop-types';

// import { useState } from 'react';

// import { FaTrash, FaEdit } from 'react-icons/fa';
// import Pagination from '../../Dashboard/components/Pagination';

// const OperationTable = ({ items }) => {
//   const [search, setSearch] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const itemsPerPage = 10;
//   const totalItems = items.length;
//   const [currentPage, setCurrentPage] = useState(1);

//   const [operations, setOperations] = useState(items);

//   const openCloseModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   // const onCommodityCreated = (newVariable) => {
//   //   setOperations([...operations, newVariable]);
//   // };

//   // Filter items based on the search input
//   const filteredOperations = operations.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   // Calculate the index of the first and last item to display on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOperations.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   // Function to handle page change
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= pageNumbers.length) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   // Generate page numbers for pagination
//   const pageNumbers = [];
//   for (
//     let i = 1;
//     i <= Math.ceil(filteredOperations.length / itemsPerPage);
//     i++
//   ) {
//     pageNumbers.push(i);
//   }

//   // if (isModalOpen) {
//   //   return (
//   //     <CreateCommodity
//   //       onCommodityCreated={onCommodityCreated}
//   //       onClose={openCloseModal}
//   //     />
//   //   );
//   // }

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
//       <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between items-center px-4 mt-2">
//         <div>
//           <label htmlFor="table-search" className="sr-only">
//             Search
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               id="table-search"
//               className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search for items"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           className="block text-white bg-primary-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//           type="button"
//           onClick={() => openCloseModal()}
//         >
//           Create Operation
//         </button>
//       </div>

//       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="p-4">
//               <div className="flex items-center">
//                 <input
//                   id="checkbox-all-search"
//                   type="checkbox"
//                   className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
//                 />
//                 <label htmlFor="checkbox-all-search" className="sr-only">
//                   checkbox
//                 </label>
//               </div>
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Title
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Message
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((item, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0
//                   ? 'bg-white'
//                   : 'bg-white dark:bg-gray-800 dark:border-gray-700'
//               } ${
//                 index === currentItems.length - 1
//                   ? 'hover:bg-gray-50 dark:hover-bg-gray-600'
//                   : 'hover:bg-gray-50 dark:hover-bg-gray-600 dark:hover-bg-gray-600'
//               }`}
//             >
//               <td className="w-4 p-4">
//                 <div className="flex items-center">
//                   <input
//                     id={`checkbox-table-search-${index + 1}`}
//                     type="checkbox"
//                     className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
//                   />
//                   <label
//                     htmlFor={`checkbox-table-search-${index + 1}`}
//                     className="sr-only"
//                   >
//                     checkbox
//                   </label>
//                 </div>
//               </td>
//               <th
//                 scope="row"
//                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//               >
//                 {item.title}
//               </th>

//               <td className="px-6 py-4">{item.message}</td>

//               <td className="px-6 py-4 flex">
//                 <button
//                   // onClick={() => handleEdit(item)}
//                   className="font-medium hover:underline flex items-center mr-3"
//                 >
//                   <FaEdit className="mr-1" /> Edit
//                 </button>

//                 <button className="font-medium hover:underline flex items-center">
//                   <FaTrash className="mr-1 text-red-600" /> Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={pageNumbers.length}
//         onPageChange={handlePageChange}
//         itemsPerPage={itemsPerPage}
//         totalItems={totalItems}
//       />
//     </div>
//   );
// };

// OperationTable.propTypes = {
//   items: PropTypes.array,
// };

// export default OperationTable;
