import styled from '@emotion/styled';
import OutlinedInput from '@mui/material/OutlinedInput';

interface InputProps {
  text?: string;
}

const TodoInput = styled(OutlinedInput)<InputProps>`
  font-size: 16px;
  border: none;
  background: #fff;
  word-wrap: inherit;
  height: 50px;
`;

export default TodoInput;
