import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ page, sizePerPage, totalSize, onPageChange }) => {
    const totalPages = Math.ceil(totalSize / sizePerPage);

    const handleNextPage = () => {
        if (page < totalPages) {
            onPageChange(page + 1, sizePerPage);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            onPageChange(page - 1, sizePerPage);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item key={i} active={i === page} onClick={() => onPageChange(i, sizePerPage)}>
                {i}
            </Pagination.Item>
        );
    }

    return (
        <>

            <Pagination className='justify-content-end mb-0 align-items-center'>
                <div className='me-3'>Total Records: {totalSize}</div>
                <Pagination.Prev onClick={handlePrevPage} disabled={page === 1} />
                {pageNumbers}
                <Pagination.Next onClick={handleNextPage} disabled={page === totalPages} />
            </Pagination>
        </>
    );
};

export default CustomPagination;
