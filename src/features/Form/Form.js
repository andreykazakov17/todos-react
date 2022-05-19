import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container, Paper } from '@mui/material';
import styled from '@emotion/styled';
import TodoInput from '../../components/Input/Input';

const StyledAuthorizationInput = styled(TodoInput)`
  height: 30px;
  font-size: 16px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
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
    email: yup.string().email().required('Email field is required'),
    password: yup.string().min(4).max(10).required('Password field is required'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
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
          <StyledAuthorizationInput name="email" placeholder="Email..." {...register('email')} />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
          />
          <StyledAuthorizationInput
            name="password"
            type="password"
            placeholder="Password..."
            {...register('password')}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>

        <p>
          Or <Link to={linkPath}>{linkName}</Link>
        </p>
      </Paper>
    </Container>
  );
};

export default Form;
