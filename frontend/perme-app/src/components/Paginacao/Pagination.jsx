import React, { useState, useEffect } from "react";
import { PaginationNav, PaginationUl, PaginationNumber, PaginationButton } from "./PaginationStyled";

const Pagination = ({ patientsPerPage, totalPatients, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const pagesToShow = 5; 

  const [selectedPage, setSelectedPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setSelectedPage(pageNumber);
    paginate(pageNumber);
  };

  useEffect(() => {
    setSelectedPage(currentPage); 
    const newStartPage = Math.max(
      Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1),
      1
    );
    setStartPage(newStartPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (selectedPage > 1) {
      const previousPage = selectedPage - 1;
      setSelectedPage(previousPage);
      paginate(previousPage);
      if (previousPage < startPage) {       
        const newStartPage = startPage - pagesToShow;
        setStartPage(newStartPage);
      }
    }
  };

  const handleNextPage = () => {
    if (selectedPage < totalPages) {
      const nextPage = selectedPage + 1;
      setSelectedPage(nextPage);
      paginate(nextPage);
      if (nextPage > startPage + pagesToShow - 1) {       
        const newStartPage = startPage + pagesToShow;
        setStartPage(newStartPage);
      }
    }
  };  
  
  const showingPages = Array.from({ length: pagesToShow }, (_, i) => startPage + i);

  return (
    <PaginationNav>
      <PaginationUl className="pagination">
        <li className="page-item">
          <PaginationButton type="button" onClick={handlePreviousPage}>&lt;</PaginationButton> 
        </li>
        {showingPages.map((number) => (
          <li key={number} className="page-item">
            <PaginationNumber
              onClick={() => handlePageClick(number)}
              href="!#"
              className={`page-link ${selectedPage === number ? 'selected' : ''}`}
            >
              {number}
            </PaginationNumber>
          </li>
        ))}
        <li className="page-item">
          <PaginationButton type="button" onClick={handleNextPage}>&gt;</PaginationButton> 
        </li>
      </PaginationUl>     
    </PaginationNav>
  );
};

export default Pagination;
