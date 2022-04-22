import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todosSlice';
import filterReducer from './filterSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
});
