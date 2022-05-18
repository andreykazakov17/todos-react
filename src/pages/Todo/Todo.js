import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import Header from '../../components/Header/Header';
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
  const navigate = useNavigate();
  const todosArr = useSelector((state) => state.todos.todosArr);
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  const user = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch({ type: 'LOAD_TODOS' });
      dispatch({ type: 'LOAD_USER' });
    }
  }, []);

  useEffect(() => {
    if (user === '') {
      navigate('/', { replace: true });
    }
  }, [user]);

  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  return (
    <>
      <Header onClick={logout} user={user} />
      <TodoMainDiv>
        <TodoH1>todos</TodoH1>
        <TodoForm />
        <TodoList todosArr={todosArr} activeFilter={activeFilter} />
        <FilterPanel todosArr={todosArr} activeFilter={activeFilter} />
      </TodoMainDiv>
    </>
  );
};

export default App;
