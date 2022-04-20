import React, { useState } from 'react';
import styled from '@emotion/styled';

import ActionButton from '../../components/Button/Button';
import TodoInput from '../../components/Input/Input';

import './TodoForm.scss';

const FormInput = styled(TodoInput)`
  border-radius: 10px;
  width: 250px;
`;

const FormPanelBtn = styled(ActionButton)`
  height: 50px;
  width: 80px;
  border-radius: 10px;
  font-size: 12px;
`;

const AppForm = ({ onAddTodo, toggleAllTodos }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onAddTodo(inputText);
    setInputText('');
  };

  return (
    <form className="todo-form" onSubmit={(e) => onSubmit(e)}>
      <FormInput
        type="text"
        value={inputText}
        placeholder="What needs to be done?"
        onChange={(e) => handleInputChange(e)}
      />
      <FormPanelBtn type="submit" variant="contained" color="success">
        Add
      </FormPanelBtn>
      <FormPanelBtn color="secondary" onClick={toggleAllTodos}>
        Toggle
      </FormPanelBtn>
    </form>
  );
};

export default AppForm;
