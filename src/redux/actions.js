import {
  ADD_TODO,
  CHECK_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  CLEAR_COMPLETED,
  ACTIVE_FILTER,
  TOGGLE_ALL_TODOS,
} from './actionTypes';

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const checkTodo = (todo) => ({
  type: CHECK_TODO,
  payload: todo,
});

export const deleteTodo = (todo) => ({
  type: DELETE_TODO,
  payload: todo,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const clearCompleted = (todo) => ({
  type: CLEAR_COMPLETED,
  payload: todo,
});

export const setActiveFilter = (filter) => ({
  type: ACTIVE_FILTER,
  payload: filter,
});

export const toggleAllTodos = () => ({
  type: TOGGLE_ALL_TODOS,
});
