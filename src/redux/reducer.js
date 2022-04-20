import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosReducer';

const reducer = combineReducers({
  todos: todosReducer,
});

export default reducer;
