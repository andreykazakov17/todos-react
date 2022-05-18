import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Form from '../../features/Form/Form';

const Login = () => {
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      navigate('/', { replace: true });
    }
  }, [userId]);

  const submitForm = async (data) => {
    dispatch({ type: 'LOG_IN', payload: data });
  };

  return (
    <>
      <Form name="Log in" submitForm={submitForm} linkPath="/signup" linkName="Sign up" />;
    </>
  );
};

export default Login;
