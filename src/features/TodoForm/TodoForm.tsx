import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import ActionButton from '../../components/Button/Button';
import TodoInput from '../../components/Input/Input';

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

const Form = styled.form`
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  margin: 0 auto;
`;

const TodoForm = () => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) return;

    dispatch({ type: 'ADD_TODO', payload: inputText });
    setInputText('');
  };

  const handleToggleAllTodos = () => {
    dispatch({ type: 'TOGGLE_ALL' });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormInput
        type="text"
        value={inputText}
        placeholder="What needs to be done?"
        onChange={handleInputChange}
      />
      <FormPanelBtn type="submit" variant="contained" color="success">
        Add
      </FormPanelBtn>
      <FormPanelBtn color="secondary" onClick={handleToggleAllTodos}>
        Toggle
      </FormPanelBtn>
    </Form>
  );
};

export default TodoForm;
