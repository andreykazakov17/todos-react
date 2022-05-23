import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { onFilterChange } from '../../store/filterSlice';

import ActionButton from '../../components/Button/Button';
import { ITodo } from 'types/todo';

const filtersArr = ['All', 'Active', 'Completed'];

const StyledFilterActionButton = styled(ActionButton)`
  min-width: 90px;
  font-size: 10px;
  min-height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const StyledClearActionButton = styled(ActionButton)`
  min-width: 90px;
  font-size: 10px;
  min-height: 30px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
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

const Counter = styled.div`
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
        {filtersArr.map((filter) => (
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
