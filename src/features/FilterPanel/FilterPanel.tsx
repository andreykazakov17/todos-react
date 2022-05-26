import React, { memo } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { onFilterChange } from '../../store/filterSlice';

import ActionButton from '../../components/Button/Button';
import { ITodo } from 'types/todo';

// const filtersArr = ['All', 'Active', 'Completed'];

enum Filter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

const filters = [Filter.ALL, Filter.ACTIVE, Filter.COMPLETED];

const StyledFilterActionButton = styled(ActionButton)`
  display: flex;
  align-items: center;
  min-width: 90px;
  min-height: 30px;
  font-size: 10px;
  border-radius: 10px;
`;

const StyledClearActionButton = styled(ActionButton)`
  min-width: 90px;
  min-height: 30px;
  font-size: 10px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2rem;
  width: 40rem;
  margin: 50px auto;
  visibility: visible;
  background: white;
  color: black;
  border-radius: 10px;
`;

const Counter = styled.div`
  width: 100px;
  font-size: 14px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem;
  margin: 0;
  width: 290px;
  list-style: none;
`;

interface IFilterPanel {
  todosArr: ITodo[];
  activeFilter: string;
}

const FilterPanel = ({ todosArr, activeFilter }: IFilterPanel) => {
  const dispatch = useDispatch();

  if (!todosArr.length) {
    return null;
  }

  const handleActiveFilter = (filter: string) => {
    dispatch(onFilterChange(filter));
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <Wrapper>
      <Counter>Total: {todosArr.length}</Counter>
      <Nav>
        {filters.map((filter) => (
          <StyledFilterActionButton
            key={filter}
            variant={filter === activeFilter ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleActiveFilter(filter)}
            className={`todo-filters-item `}
          >
            {filter}
          </StyledFilterActionButton>
        ))}
      </Nav>
      <StyledClearActionButton
        variant="outlined"
        color="error"
        className="todo-filters-clear"
        onClick={handleClearCompleted}
      >
        Clear completed
      </StyledClearActionButton>
    </Wrapper>
  );
};

export default FilterPanel;
