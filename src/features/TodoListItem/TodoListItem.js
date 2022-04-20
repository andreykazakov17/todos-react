import React, { useState } from 'react';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';

import ActionButton from '../../components/Button/Button';
import TodoInput from '../../components/Input/Input';

import './TodoListItem.scss';

const SecondaryInput = styled(TodoInput)`
  height: 50px;
  font-size: 18px;
`;

const ListItemBtn = styled(ActionButton)`
  min-width: 80px;
`;

const TodoListItem = ({ id, text, completed, onCheck, onDelete, updateTodo }) => {
  const [isActiveInput, setIsActiveInput] = useState(false);

  const hideInput = () => setIsActiveInput(false);
  const showInput = () => setIsActiveInput(true);

  return (
    <li
      key={id.toString()}
      data-id={id.toString()}
      className={completed ? 'todo-item checked completed' : 'todo-item'}
    >
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
        <div className="todo-item-wrapper">
          {!isActiveInput ? (
            <div onDoubleClick={() => showInput()} className="todo-item-wrapper-text">
              {text}
            </div>
          ) : (
            <div className="secondary-unput">
              <SecondaryInput
                autoFocus
                id={id.toString()}
                text={text}
                defaultValue={text}
                onChange={(e) => updateTodo(id, e.target.value)}
                onBlur={() => hideInput()}
              />
            </div>
          )}
        </div>
        <ListItemBtn color="error" className="todo-item-trash-btn" onClick={onDelete}>
          <i className="fa-solid fa-circle-xmark" />
        </ListItemBtn>
      </Paper>
    </li>
  );
};

export default TodoListItem;
