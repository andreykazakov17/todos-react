import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import ActionButton from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';

const StyledTableData = styled.td<{ isOpen?: boolean }>`
  padding: 5px;
  border: none;
  border-bottom: 5px solid #f2f8f8;
  pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'all')};
`;

interface ITableRow {
  id: string;
  text: string;
  completed: boolean;
  user: string;
}

const TableRow = memo(({ id, text, completed, user }: ITableRow) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', payload: todoId });
  };

  return (
    <tr>
      <StyledTableData>{text}</StyledTableData>
      <StyledTableData>{`${completed}`}</StyledTableData>
      <StyledTableData>{user}</StyledTableData>
      <StyledTableData>
        <ActionButton
          color="error"
          onClick={() => {
            setIsOpen(true);
            setTodoId(id);
          }}
        >
          Delete
        </ActionButton>
      </StyledTableData>
      <td>
        {/* <CSSTransition in={isOpen} classNames="open" timeout={0.5} unmountOnExit>
          <Modal
            id={todoId}
            setIsOpen={setIsOpen}
            onDelete={handleDeleteTodo}
            setTodoId={setTodoId}
          />
        </CSSTransition> */}
        {isOpen ? (
          <Modal
            id={todoId}
            setIsOpen={setIsOpen}
            onDelete={handleDeleteTodo}
            setTodoId={setTodoId}
          />
        ) : null}
      </td>
    </tr>
  );
});
export default TableRow;
