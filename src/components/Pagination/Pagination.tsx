import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../TableReports/TableReports.module.css';

interface IProps {
  pageCount: number;
  setCurrentPage: (arg: number) => void;
}

const Pagination = ({ pageCount, setCurrentPage }: IProps) => {
  function handlePageClick({ selected: selectedPage }: { selected: number }) {
    setCurrentPage(selectedPage);
  }
  return (
    <ReactPaginate
      previousLabel={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      }
      nextLabel={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      }
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={styles.pagination}
      previousLinkClassName={styles.paginationLink}
      nextLinkClassName={styles.paginationLink}
      disabledClassName={styles.paginationDisabled}
      activeClassName={styles.paginationActive}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
