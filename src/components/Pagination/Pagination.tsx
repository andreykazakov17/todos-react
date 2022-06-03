import React from 'react';
import styled from '@emotion/styled';

const StyledPaginationUl = styled.ul`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  padding-left: 0px;
  margin: 0 auto;
  min-width: 200px;
  max-width: 300px;
  display: flex;
  justify-content: center;
  list-style-type: none;
`;

const StyledPaginationLi = styled.li`
  margin: 5px;
  list-style-type: none;
`;

const StyledPaginationButton = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  padding: 5px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'regular')};
  color: black;
  background-color: ${({ selected }) => (selected ? 'rgba(86, 184, 86, 0.25)' : 'white')};
  border-radius: 5px;
  border: none;
  outline: 0.5px solid rgba(150, 150, 150, 0.5);
  box-shadow: ${({ selected }) =>
    selected
      ? '-1px 15px 15px -5px rgba(0, 0, 0, 0.25)'
      : '-1px 15px 15px -5px rgba(0, 0, 0, 0.09)'};
  cursor: pointer;
  &:hover {
    outline: 0.5px solid rgba(0, 0, 0, 1);
  }
`;

interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  itemsLength: number;
  paginate: (value: number) => void;
}

const Pagination = ({ currentPage, itemsPerPage, itemsLength, paginate }: IPagination) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(itemsLength / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledPaginationUl>
      {pageNumbers.map((item) => (
        <StyledPaginationLi key={item}>
          <StyledPaginationButton selected={currentPage === item} onClick={() => paginate(item)}>
            {item}
          </StyledPaginationButton>
        </StyledPaginationLi>
      ))}
    </StyledPaginationUl>
  );
};

export default Pagination;
