import React from 'react';
import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

interface ButtonProps {
  type?: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  className?: string;
  size?: string;
  children: ReactNode;
  onClick?: () => void;
}

const StyledButton = styled(Button)`
  min-width: 80px;
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => props.color};
`;

const ActionButton = ({ variant, color, className, children, onClick }: ButtonProps) => (
  <StyledButton variant={variant} color={color} className={className} onClick={onClick}>
    {children}
  </StyledButton>
);

export default ActionButton;
