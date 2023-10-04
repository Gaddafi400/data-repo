import PropTypes from 'prop-types';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Create an array of page numbers from 1 to totalPages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination mt-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-full p-3 bg-secondary-lightest text-primary-400 text-sm border border-primary-400"
      >
        <FaArrowLeft size={18} />
      </button>
      <div className="page-numbers">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-2 page-number ${
              currentPage === pageNumber ? 'active' : ''
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-full p-3 bg-secondary-lightest text-primary-400 text-sm border border-primary-400"
      >
        <FaArrowRight size={18} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
