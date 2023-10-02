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
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="btn rounded-full flex items-center justify-center w-12 h-12"
      >
        <FaArrowLeft size={24} />
      </button>
      <div className="page-numbers">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-number ${
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
        className="btn rounded-full flex items-center justify-center w-12 h-12"
      >
        <FaArrowRight size={24} />
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
