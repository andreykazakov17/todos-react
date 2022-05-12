import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/Form/Form';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitForm = (data) => {
    dispatch({ type: 'SIGN_UP', payload: data });
    navigate('/login', { replace: true });
  };

  return <Form name="Sign up" submitForm={submitForm} linkPath="/login" linkName="Log in" />;
};

export default Signup;
