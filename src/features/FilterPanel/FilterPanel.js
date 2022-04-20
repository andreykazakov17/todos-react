import React from 'react';
import styled from '@emotion/styled';

import ActionButton from '../../components/Button/Button';

const filtersArr = ['All', 'Active', 'Completed'];

const FilterBtn = styled(ActionButton)`
  min-width: 90px;
  font-size: 10px;
  min-height: 30px;
  border-radius: 10px;
  display: flex,
  align-items: center
`;

const ClearCompletedBtn = styled(ActionButton)`
  min-width: 90px;
  font-size: 10px;
  min-height: 30px;
  border-radius: 10px;
`;

const WrapperDiv = styled.div`
  visibility: visible;
  height: 2rem;
  width: 40rem;
  margin: 50px auto;
  background: white;
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CounterDiv = styled.div`
  font-size: 14px;
  width: 100px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0rem;
  width: 290px;
  margin: 0;
`;

const FilterPanel = ({ todosArr, activeFilter, onFilters, clearCompleted }) => {
  if (!todosArr.length) {
    return null;
  }

  return (
    <WrapperDiv>
      <CounterDiv>Total: {todosArr.length}</CounterDiv>
      <Nav>
        {filtersArr.map((filter) => (
          <FilterBtn
            key={filter}
            variant={filter === activeFilter ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onFilters(filter)}
            className={`todo-filters-item `}
          >
            {filter}
          </FilterBtn>
        ))}
      </Nav>
      <ClearCompletedBtn
        variant="outlined"
        color="error"
        className="todo-filters-clear"
        onClick={() => clearCompleted()}
      >
        Clear completed
      </ClearCompletedBtn>
    </WrapperDiv>
  );
};

export default FilterPanel;
