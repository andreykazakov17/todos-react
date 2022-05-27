import React, { useState, ChangeEvent, FormEvent, memo } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import ActionButton from '../../components/Button/Button';
import TodoInput from '../../components/Input/Input';

const FormInput = styled(TodoInput)`
  width: 250px;
  border-radius: 10px;
`;

const FormPanelBtn = styled(ActionButton)`
  height: 50px;
  width: 80px;
  font-size: 12px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 20vh;
  width: 450px;
`;

const TodoForm = memo(() => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
});

export default TodoForm;
