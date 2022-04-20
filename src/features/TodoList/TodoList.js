import React from 'react';
import styled from '@emotion/styled';

import TodoListItem from '../TodoListItem/TodoListItem';
import filterTodos from '../../utils/filterTodos';

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

const TodoList = ({ todosArr, filter, onCheck, onDelete, updateTodo }) => (
  <Container>
    <UnorderedList>
      {filterTodos(todosArr, filter).map((item) => {
        const { id, text, completed } = item;

        return (
          <TodoListItem
            key={id}
            id={id}
            text={text}
            completed={completed}
            onCheck={() => onCheck(id)}
            onDelete={() => onDelete(id)}
            updateTodo={updateTodo}
          />
        );
      })}
    </UnorderedList>
  </Container>
);

export default TodoList;
