import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="flex items-center justify-between pt-4 px-4 pb-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage === totalPages
            ? (currentPage - 1) * itemsPerPage + 1
            : (currentPage - 1) * itemsPerPage + 1}{' '}
        </span>
        -{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage === totalPages ? totalItems : currentPage * itemsPerPage}{' '}
        </span>
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>

      <ul className="inline-flex -space-x-px text-sm h-8">
        {currentPage > 1 && (
          <li>
            <a
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
            >
              Previous
            </a>
          </li>
        )}

        {pageNumbers.map((number, index) => (
          <li key={number}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                currentPage === number
                  ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark-hover-bg-gray-700 dark-hover-text-white'
                  : 'hover:bg-gray-100 hover:text-gray-700 dark-hover-bg-gray-700 dark-hover-text-white'
              } ${index === 0 && currentPage === 1 ? 'rounded-l-lg' : ''} ${
                index === pageNumbers.length - 1 && currentPage === totalPages
                  ? 'rounded-r-lg'
                  : ''
              }`}
            >
              {number}
            </a>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white rounded-r-lg"
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default Pagination;
