import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import PrivateRoute from '../utils/PrivateRoute';

const Todo = lazy(() => import('./Todo/Todo'));

const App = () => (
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
export default App;
