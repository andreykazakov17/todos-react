import React from 'react';
import styled from '@emotion/styled';

import TodoListItem from '../TodoListItem/TodoListItem';
import filterTodos from '../../utils/filterTodos';
import { ITodo } from 'types/todo';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const UnorderedList = styled.ul`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

interface ITodoList {
  todosArr: ITodo[];
  activeFilter: string;
  selectedTodo: string;
}

const TodoList = ({ todosArr, activeFilter, selectedTodo }: ITodoList) => {
  const found = todosArr.filter((item) => item.id === selectedTodo);
  const filtered =
    selectedTodo !== '' ? filterTodos(found, activeFilter) : filterTodos(todosArr, activeFilter);

  return (
    <Container>
      <UnorderedList>
        {filtered.map(({ id, text, completed }: ITodo) => {
          return <TodoListItem key={id} id={id} text={text} completed={completed} />;
        })}
      </UnorderedList>
    </Container>
  );
};

export default TodoList;
