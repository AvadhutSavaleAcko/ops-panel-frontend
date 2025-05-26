import React from 'react';
import {
  PaginationWrapper,
  PaginationContainer,
  PageButton,
  RowsPerPageSelect,
  ExpandButton
} from './styles';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  config?: any;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isExpanded,
  onExpandToggle,
  config
}) => {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const totalPagesToShow = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

    if (endPage - startPage + 1 < totalPagesToShow) {
      startPage = Math.max(1, endPage - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <PaginationWrapper>
      <RowsPerPageSelect>
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {[10, 20, 30].map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </RowsPerPageSelect>

      <PaginationContainer>
        <PageButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </PageButton>
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </PageButton>

        {getPageNumbers().map(page => (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            active={currentPage === page}
          >
            {page}
          </PageButton>
        ))}

        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
        <PageButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </PageButton>
      </PaginationContainer>

      <ExpandButton onClick={onExpandToggle}>
        {isExpanded ? "Compress" : "Expand"}
      </ExpandButton>
    </PaginationWrapper>
  );
};