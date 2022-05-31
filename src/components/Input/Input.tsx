import React from 'react';
import styled from '@emotion/styled';
import OutlinedInput from '@mui/material/OutlinedInput';

interface InputProps {
  text?: string;
  error?: boolean;
  inputColor?: string;
}

const TodoInput = styled(OutlinedInput)<InputProps>`
  height: 50px;
  font-size: 16px;
  border: none;
  background: #fff;
  word-wrap: inherit;
`;

export default TodoInput;
