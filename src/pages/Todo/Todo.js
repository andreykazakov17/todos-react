import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import TodoForm from '../../features/TodoForm/TodoForm';
import TodoList from '../../features/TodoList/TodoList';
import FilterPanel from '../../features/FilterPanel/FilterPanel';

const TodoMainDiv = styled.div`
  background-color: rgb(255, 255, 255);
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
`;

const TodoH1 = styled.h1`
  margin: 0 auto;
  font-size: 7.5rem;
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const todosArr = useSelector((state) => state.todos.todosArr);
  const activeFilter = useSelector((state) => state.filter.activeFilter);

  return (
    <TodoMainDiv>
      <TodoH1>todos</TodoH1>
      <TodoForm />
      <TodoList todosArr={todosArr} activeFilter={activeFilter} />
      <FilterPanel todosArr={todosArr} activeFilter={activeFilter} />
    </TodoMainDiv>
  );
};

export default App;
