import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosReducer';
import filtersReducer from './filtersReducer';

const reducer = combineReducers({
  todos: todosReducer,
  filter: filtersReducer,
});

export default reducer;
