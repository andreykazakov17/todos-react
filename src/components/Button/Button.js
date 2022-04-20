import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  min-width: 80px;
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => props.color};
`;

const ActionButton = ({ variant, color, className, children, onClick }) => (
  <StyledButton variant={variant} color={color} className={className} onClick={onClick}>
    {children}
  </StyledButton>
);

export default ActionButton;
