import React from 'react';
import styled from 'styled-components';

import ActionButton from '../Button/Button';

const StyledModalBackground = styled.div`
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

const StyledModalBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: white;
  width: 400px;
  height: 280px;
  transition: 0.5s all;
  pointer-events: all;
`;

const StyledModalTitle = styled.div`
  padding: 5px;
  width: 65%;
  text-align: center;
  margin-bottom: 15px;
  font-size: 24px;
  color: #111827;
  font-weight: 800;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 200px;
`;

const StyledCloseModalButton = styled(ActionButton)`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 15px;
`;

const StyledModalText = styled.div`
  width: 75%;
  text-align: center;
`;

interface IModalProps {
  id: string | null;
  title: string;
  onClose: (value: boolean) => void;
  onConfirmClick: (value: string | null) => void;
  onDiscardClick: (value: string | null) => void;
}

const Modal = ({ id, title, onClose, onConfirmClick, onDiscardClick }: IModalProps) => (
  <StyledModalBackground>
    <StyledModalBody onClick={(e) => e.stopPropagation()}>
      <StyledCloseModalButton
        color="error"
        onClick={() => {
          onClose(false);
          onDiscardClick(null);
        }}
      >
        X
      </StyledCloseModalButton>
      <StyledModalTitle>{title}</StyledModalTitle>
      <StyledModalText>This will remove the given element permanently</StyledModalText>
      <StyledButtonWrapper>
        <ActionButton color="secondary" onClick={() => onClose(false)}>
          Cancel
        </ActionButton>
        <ActionButton
          color="error"
          onClick={() => {
            onConfirmClick(id);
            onClose(false);
          }}
        >
          Delete
        </ActionButton>
      </StyledButtonWrapper>
    </StyledModalBody>
  </StyledModalBackground>
);

export default Modal;
