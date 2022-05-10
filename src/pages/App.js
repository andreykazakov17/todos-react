import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Todo from './Todo/Todo';

const App = () => (
  <Routes>
    <Route path="/" exact element={<Todo />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);
export default App;
