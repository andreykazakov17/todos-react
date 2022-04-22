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

const TodoList = ({ todosArr, activeFilter }) => (
  <Container>
    <UnorderedList>
      {filterTodos(todosArr, activeFilter).map((item) => {
        const { id, text, completed } = item;
        return <TodoListItem key={id} id={id} text={text} completed={completed} />;
      })}
    </UnorderedList>
  </Container>
);

export default TodoList;
