import React, { FC } from 'react';
import styled from '@emotion/styled';

import TodoListItem from '../TodoListItem/TodoListItem';
import filterTodos from '../../utils/filterTodos';
import { ITodo } from 'types/todo';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const UnorderedList = styled.ul`
  padding: 0;
  list-style: none;
  display: block;
  margin: 0 auto;
  position: relative;
`;

interface ITodoList {
  todosArr: ITodo[];
  activeFilter: string;
}

const TodoList = ({ todosArr, activeFilter }: ITodoList) => (
  <Container>
    <UnorderedList>
      {filterTodos(todosArr, activeFilter).map(({ id, text, completed }: ITodo) => {
        return <TodoListItem key={id} id={id} text={text} completed={completed} />;
      })}
    </UnorderedList>
  </Container>
);

export default TodoList;
