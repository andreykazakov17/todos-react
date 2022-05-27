import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../types/todo';
import { IRootState, ITodosState } from './storeTypes/state';

const initialState: ITodosState = {
  todosArr: [],
  idsArr: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodos(state, action: PayloadAction<ITodo[]>) {
      state.todosArr = action.payload;
    },
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todosArr.push(action.payload);
    },
    checkTodo(state, action: PayloadAction<string>) {
      const todosArr = current(state.todosArr);
      todosArr.forEach((item, index) => {
        if (item.id === action.payload) {
          state.todosArr[index] = { ...item, completed: !item.completed };
        }
      });
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const todosArr = current(state.todosArr);
      const index = todosArr.findIndex((todo) => todo.id === action.payload);
      state.todosArr.splice(index, 1);
    },
    updateTodo(state, action: PayloadAction<ITodo>) {
      const todosArr = current(state.todosArr);
      const index = todosArr.findIndex((todo) => todo.id === action.payload.id);
      state.todosArr.splice(index, 1, action.payload);
    },
    clearCompleted(state, action: PayloadAction<ITodo[]>) {
      state.todosArr = action.payload;
    },
    toggleAllTodos(state, action: PayloadAction<ITodo[]>) {
      state.todosArr = action.payload;
    },
  },
});

export const todosArrSelector = (state: IRootState) => state.todos.todosArr;

export const {
  getTodos,
  addTodo,
  checkTodo,
  deleteTodo,
  updateTodo,
  clearCompleted,
  toggleAllTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
