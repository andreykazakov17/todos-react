import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container, Paper } from '@mui/material';
import styled from '@emotion/styled';
import TodoInput from '../../components/Input/Input';
import { IUserRecord } from 'types/record';

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

interface IForm {
  name: string;
  submitForm: (data: IUserRecord) => void;
  linkPath: string;
  linkName: string;
}

interface FormValues {
  email: string;
  password: string;
}

const Form = ({ name, submitForm, linkPath, linkName }: IForm) => {
  const schema = yup.object().shape({
    email: yup.string().email().required('Email field is required'),
    password: yup.string().min(4).max(10).required('Password field is required'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
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
          <StyledAuthorizationInput {...register('email')} name="email" placeholder="Email..." />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
          />
          <StyledAuthorizationInput
            {...register('password')}
            name="password"
            type="password"
            placeholder="Password..."
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
