import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import TodoTableRow from 'components/TodoTableRow/TodoTableRow';
import { ITodo } from 'types/todo';
import Modal from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';

const StyledTable = styled.table`
  position: relative;
  width: 70%;
  margin: 0 auto;
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

const Table = memo(({ todos }: ITodos) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [todoToRemove, setTodoToRemove] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleDeleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE_TODO', payload: todoToRemove });
  }, [todoToRemove]);

  const onDelete = useCallback((id: string | null) => {
    setIsOpen(true);
    setTodoToRemove(id);
  }, []);

  const onDiscardClick = () => setTodoToRemove(null);
  const onClose = () => setIsOpen(false);

  return (
    <>
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
            <TodoTableRow
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
              user={item.user}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </StyledTable>
      <Modal
        isOpen={isOpen}
        title="Are you sure want to delete this item?"
        onClose={onClose}
        onConfirmClick={handleDeleteTodo}
        onDiscardClick={onDiscardClick}
      />
    </>
  );
});
export default Table;
