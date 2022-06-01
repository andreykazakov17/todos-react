import React, { memo } from 'react';
import styled from 'styled-components';

import TableRow from 'components/TableRow/TableRow';
import { ITodo } from 'types/todo';

const StyledTable = styled.table`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  border: 15px solid #f2f8f8;
  border-top: 5px solid #f2f8f8;
  border-collapse: collapse;
`;

const StyledTH = styled.th`
  text-align: left;
  font-weight: bold;
  padding: 5px;
  background: #f2f8f8;
  border: none;
  border-bottom: 5px solid #f2f8f8;
`;

interface ITodos {
  todos: ITodo[];
}

const Table = memo(({ todos }: ITodos) => (
  <StyledTable>
    <thead>
      <tr>
        <StyledTH>Text</StyledTH>
        <StyledTH>Completed</StyledTH>
        <StyledTH>User ID</StyledTH>
        <StyledTH>Actions</StyledTH>
      </tr>
    </thead>
    <tbody>
      {todos.map((item) => (
        <TableRow
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.completed}
          user={item.user}
        />
      ))}
    </tbody>
  </StyledTable>
));
export default Table;
