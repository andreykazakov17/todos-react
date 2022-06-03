import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Dropdown from 'components/Dropdown/Dropdown';
import ActionButton from 'components/Button/Button';
import { useSelector, useDispatch } from '../../types/hooks';

import Header from '../../components/Header/Header';
import TodoForm from '../../features/TodoForm/TodoForm';
import TodoList from '../../features/TodoList/TodoList';
import FilterPanel from '../../features/FilterPanel/FilterPanel';
import Table from '../../features/TodoTable/TodoTable';

const StyledShowAllButton = styled(ActionButton)`
  position: absolute;
  left: 300px;
  height: 40px;
  font-size: 12px;
`;

const TodoMainDiv = styled.div`
  min-height: 90vh;
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
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch({ type: 'LOAD_TODOS' });
    }
    setIsVisible(false);
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

  const onChangeDropdown = (value: string | null) => {
    setSelectedTodoId(value);
  };

  return (
    <>
      <Header onClick={logout} user={user}>
        <Dropdown
          value={selectedTodoId}
          options={todosOptions}
          onChange={onChangeDropdown}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </Header>

      <TodoMainDiv>
        <TodoH1>todos</TodoH1>
        <TodoForm />
        <Table todos={todosArr} />
      </TodoMainDiv>
    </>
  );
};

export default App;
