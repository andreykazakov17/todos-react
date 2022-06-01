import React from 'react';
import styled from 'styled-components';

import ActionButton from '../Button/Button';

const StyledModal = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  transition: 0.5s all;
  background-color: rgba(0, 0, 0, 0.4);

  &.open-enter {
    opacity: 0;
  }

  &.open-enter-active {
    opacity: 1;
  }

  &.open-exit {
    opacity: 1;
  }

  &.open-exit-active {
    opacity: 0;
  }
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  width: 400px;
  height: 150px;
  transition: 0.5s all;
  pointer-events: all;
`;

const StyledModalTitle = styled.div`
  padding: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #111827;
  pointer-events: all;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: normal;
`;

interface IModal {
  id: string | null;
  setIsOpen: (value: boolean) => void;
  onDelete: (value: string | null) => void;
  setTodoId: (value: string | null) => void;
}

const Modal = ({ id, setIsOpen, onDelete, setTodoId }: IModal) => (
  <StyledModal
    onClick={() => {
      setIsOpen(false);
      setTodoId(null);
    }}
  >
    <StyledModalContent onClick={(e) => e.stopPropagation()}>
      <StyledModalTitle>Do you really want to delete todo?</StyledModalTitle>
      <ActionButton color="error" onClick={() => onDelete(id)}>
        Delete
      </ActionButton>
    </StyledModalContent>
  </StyledModal>
);

export default Modal;
