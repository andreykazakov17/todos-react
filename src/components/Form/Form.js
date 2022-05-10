import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container, Paper } from '@mui/material';
import styled from '@emotion/styled';
import TodoInput from '../Input/Input';

const StyledAutorizationInput = styled(TodoInput)`
  height: 30px;
  font-size: 16px;
  margin-top: 10px;
`;

const SubmitInput = styled.input`
  display: block;
  margin-top: 2rem;
  padding: 5px;
  width: 5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: green;
  color: white;
`;

const Form = ({ name, submitForm, linkPath, linkName }) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(10).required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{
          mt: 5,
          mx: 'auto',
          display: 'grid',
          padding: 4,
          width: 400,
          minHeight: 80,
          borderRadius: '16px',
        }}
      >
        <h1>{name}</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <StyledAutorizationInput name="email" placeholder="Email..." {...register('email')} />
          <StyledAutorizationInput
            name="password"
            type="password"
            placeholder="Password..."
            {...register('password')}
          />
          <SubmitInput type="submit" />
        </form>
        <p>
          Or <Link to={linkPath}>{linkName}</Link>
        </p>
      </Paper>
    </Container>
  );
};

export default Form;
