import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';

const Login = () => {
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    dispatch({ type: 'LOG_IN', payload: data });
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      navigate('/', { replace: true });
    }
  }, []);

  return <Form name="Log in" submitForm={submitForm} linkPath="/signup" linkName="Sign up" />;
};

export default Login;
