import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/hooks';
import styled from '@emotion/styled';

import Header from '../../components/Header/Header';
import TodoForm from '../../features/TodoForm/TodoForm';
import TodoList from '../../features/TodoList/TodoList';
import FilterPanel from '../../features/FilterPanel/FilterPanel';
import Dropdown from 'components/Dropdown/Dropdown';
import ActionButton from 'components/Button/Button';

const StyledShowAllButton = styled(ActionButton)`
  position: absolute;
  left: 180px;
  height: 40px;
  font-size: 12px;
`;

const StyledDropdownWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 300px;
`;

const TodoMainDiv = styled.div`
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  background-color: rgb(255, 255, 255);
`;

const TodoH1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 20vh;
  font-size: 7.5rem;
`;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todosArr = useSelector((state) => state.todos.todosArr);
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  const user = useSelector((state) => state.user.email);
  const [selectedTodo, setSelectedTodo] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch({ type: 'LOAD_TODOS' });
    }
  }, []);

  useEffect(() => {
    if (user === '') {
      navigate('/', { replace: true });
    }
  }, [user]);

  const logout = useCallback(() => {
    dispatch({ type: 'LOG_OUT' });
  }, []);

  const todosOptions = useMemo(
    () => todosArr.map((item) => ({ id: item.id, name: item.text })),
    [todosArr],
  );

  const onSelectOne = useCallback((value: string) => {
    setSelectedTodo(value);
  }, []);

  const onShowAll = useCallback(() => {
    setSelectedTodo('');
  }, []);

  return (
    <>
      <Header onClick={logout} user={user} />

      <TodoMainDiv>
        <StyledDropdownWrapper>
          <Dropdown value={selectedTodo} options={todosOptions} onChange={onSelectOne} />
          <StyledShowAllButton variant="outlined" color="warning" onClick={onShowAll}>
            Show All
          </StyledShowAllButton>
        </StyledDropdownWrapper>
        <TodoH1>todos</TodoH1>
        <TodoForm />
        <TodoList selectedTodo={selectedTodo} todosArr={todosArr} activeFilter={activeFilter} />
        <FilterPanel todosArr={todosArr} activeFilter={activeFilter} />
      </TodoMainDiv>
    </>
  );
};

export default App;
