import React, { memo, useState } from 'react';
import styled from 'styled-components';

import ActionButton from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import TableTrashIcon from 'icons/TableTrashIcon';
import Modal from '../Modal/Modal';

const StyledTableTrashButton = styled(ActionButton)`
  width: 50px;
  height: 100%;
`;

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
  setIsOpen: (value: boolean) => void;
  setTodoId: (value: string | null) => void;
}

const TodoTableRow = memo(({ id, text, completed, user, setIsOpen, setTodoId }: ITableRow) => (
  <tr>
    <StyledTableData>{text}</StyledTableData>
    <StyledTableData>{`${completed}`}</StyledTableData>
    <StyledTableData>{user}</StyledTableData>
    <StyledTableData>
      <StyledTableTrashButton
        color="error"
        onClick={() => {
          setIsOpen(true);
          setTodoId(id);
        }}
      >
        <TableTrashIcon />
      </StyledTableTrashButton>
    </StyledTableData>
  </tr>
));
export default TodoTableRow;
