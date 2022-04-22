import React from 'react';

import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { clearCompleted, setActiveFilter, toggleAllTodos } from '../../redux/actions';

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

const App = ({ todosArr, activeFilter, setActiveFilter, clearCompleted, toggleAllTodos }) => (
  <TodoMainDiv>
    <TodoH1>todos</TodoH1>
    <TodoForm toggleAllTodos={toggleAllTodos} />
    <TodoList todosArr={todosArr} activeFilter={activeFilter} />
    <FilterPanel
      todosArr={todosArr}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      clearCompleted={clearCompleted}
    />
  </TodoMainDiv>
);
const mapStateToProps = (state) => ({
  todosArr: state.todos.todosArr,
  activeFilter: state.filter.activeFilter,
});
const mapDispatchToProps = {
  clearCompleted,
  setActiveFilter,
  toggleAllTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
