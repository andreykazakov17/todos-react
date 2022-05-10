import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';

const Login = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch({ type: 'LOG_IN', payload: data });
  };

  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      navigate('/', { replace: true });
    }
  }, [isAuth]);

  return <Form name="Log in" submitForm={submitForm} linkPath="/signup" linkName="Sign up" />;
};

export default Login;
