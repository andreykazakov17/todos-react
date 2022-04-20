import React, { useState } from 'react';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';

import ActionButton from '../../components/Button/Button';
import TodoInput from '../../components/Input/Input';

const ListItem = styled.li`
  position: relative;
  padding: 0rem 0.5rem;
  height: auto;
  width: 25rem;
  margin: 0.5rem;
  background: white;
  color: black;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 25px;
  border-color: 2e7d32;
  border-width: 1px;
  word-break: break-all;
  transition: all 0.5s ease;
  ${(props) =>
    props.completed
      ? 'text-decoration: line-through;  opacity: 0.3; color: green;'
      : 'text-decoration: none;  opacity: none; color: black;'}
`;

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  color: rgb(0, 0, 0);
  cursor: pointer;
  min-width: 255px;
  border: none;
  user-select: none;
`;

const TextDiv = styled.div`
  width: 100%;
`;

const SecondaryInput = styled(TodoInput)`
  height: 50px;
  font-size: 18px;
`;

const ListItemBtn = styled(ActionButton)`
  min-width: 80px;
`;

const TrashBtn = styled(ActionButton)`
  min-width: 80px;
  height: 100%;
  position: absolute;
  right: 16px;
`;

const TodoListItem = ({ id, text, completed, onCheck, onDelete, updateTodo }) => {
  const [isActiveInput, setIsActiveInput] = useState(false);

  const hideInput = () => setIsActiveInput(false);
  const showInput = () => setIsActiveInput(true);

  return (
    <ListItem key={id} data-id={id} completed={completed}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignContent: 'center',
          width: 400,
          minHeight: 80,
          borderRadius: '16px',
        }}
      >
        <ListItemBtn color="success" onClick={onCheck}>
          <i className="fa-solid fa-circle-check" />
        </ListItemBtn>
        <WrapperDiv>
          {!isActiveInput ? (
            <TextDiv onDoubleClick={() => showInput()}>{text}</TextDiv>
          ) : (
            <SecondaryInput
              autoFocus
              id={id.toString()}
              text={text}
              defaultValue={text}
              onChange={(e) => updateTodo(id, e.target.value)}
              onBlur={() => hideInput()}
            />
          )}
        </WrapperDiv>
        <TrashBtn color="error" onClick={onDelete}>
          <i className="fa-solid fa-circle-xmark" />
        </TrashBtn>
      </Paper>
    </ListItem>
  );
};

export default TodoListItem;
