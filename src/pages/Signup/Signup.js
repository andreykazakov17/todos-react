import React from 'react';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';

const Signup = () => {
  const dispatch = useDispatch();
  const submitForm = (data) => {
    dispatch({ type: 'SIGN_UP', payload: data });
  };

  return <Form name="Sign up" submitForm={submitForm} linkPath="/login" linkName="Log in" />;
};

export default Signup;
