import React from 'react';
import styled from '@emotion/styled';

import ActionButton from '../../components/Button/Button';

import './FilterPanel.scss';

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

const FilterPanel = ({ todosArr, activeFilter, onFilters, clearCompleted }) => {
  if (!todosArr.length) {
    return null;
  }

  return (
    <div className="todo-filters visible">
      <div className="todo-filters-total">Total: {todosArr.length}</div>
      <nav className="todo-filters-list">
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
      </nav>
      <ClearCompletedBtn
        variant="outlined"
        color="error"
        className="todo-filters-clear"
        onClick={() => clearCompleted()}
      >
        Clear completed
      </ClearCompletedBtn>
    </div>
  );
};

export default FilterPanel;
