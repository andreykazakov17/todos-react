import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import PrivateRoute from '../utils/PrivateRoute';

const Todo = lazy(() => import('./Todo/Todo'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch({ type: 'LOAD_USER' });
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            style={{
              justifyContent: 'center',
              position: 'fixed',
              top: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      }
    >
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};
export default App;
