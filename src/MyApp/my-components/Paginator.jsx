import React from 'react';

const Paginator = ({ limit, offset, setLimit, setOffset, total }) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setOffset((currentPage - 2) * limit);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setOffset(currentPage * limit);
    }
  };

  const handlePageClick = (page) => {
    setOffset((page - 1) * limit);
  };


  return (
    
    <div className="paginator gap-3 d-flex">
      <button className='btn btn-primary btn-sm' onClick={handlePrevious} disabled={currentPage === 1}>
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className='btn btn-primary btn-sm'
          onClick={() => handlePageClick(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button className='btn btn-primary btn-sm' onClick={handleNext} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;