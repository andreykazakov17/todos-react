import React from 'react';
import { Routes, Route, ProtectedRoute } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Todo from './Todo/Todo';
import PrivateRoute from '../utils/PrivateRoute';

const App = () => (
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
);
export default App;
