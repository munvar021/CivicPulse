import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  PaginationContainer,
  PageButton,
  PageInfo,
  PageNumberButton,
} from "./paginationStyles";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxPageButtons = 5,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="First Page"
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </PageButton>

      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous Page"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </PageButton>

      {showPageNumbers && (
        <>
          {getPageNumbers().map((page) => (
            <PageNumberButton
              key={page}
              $active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PageNumberButton>
          ))}
        </>
      )}

      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next Page"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </PageButton>

      <PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Last Page"
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
