import React, { useNavigate } from 'react-router-dom';
import { useDispatch } from 'types/hooks';

import Form from '../../features/Form/Form';
import { IUserRecord } from 'types/record';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitForm = (data: IUserRecord) => {
    dispatch({ type: 'SIGN_UP', payload: data });
    navigate('/login', { replace: true });
  };

  return <Form name="Sign up" submitForm={submitForm} linkPath="/login" linkName="Log in" />;
};

export default Signup;
