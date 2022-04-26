import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todosArr: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todosArr.push(action.payload);
    },
    checkTodo(state, action) {
      state.todosArr.forEach((item, index) => {
        if (item.id === action.payload) {
          state.todosArr[index] = { ...item, completed: !item.completed };
        }
      });
    },
    deleteTodo(state, action) {
      const index = state.todosArr.findIndex((todo) => todo.id === action.payload);
      state.todosArr.splice(index, 1);
    },
    updateTodo(state, action) {
      state.todosArr.forEach((item, index) => {
        if (item.id === action.payload.id) {
          state.todosArr[index] = { ...item, text: action.payload.value };
        }
      });
    },
    onClearCompleted(state) {
      state.todosArr = state.todosArr.filter((item) => !item.completed);
    },
    toggleAllTodos(state) {
      const everyChecked = state.todosArr.every((item) => item.completed);
      const everyUnchecked = state.todosArr.every((item) => !item.completed);
      const someChecked = state.todosArr.some((item) => item.completed);

      if (everyUnchecked || someChecked) {
        state.todosArr = state.todosArr.map((item) => ({ ...item, completed: true }));
      }

      if (everyChecked) {
        state.todosArr = state.todosArr.map((item) => ({ ...item, completed: false }));
      }
    },
  },
});

export const { addTodo, checkTodo, deleteTodo, updateTodo, onClearCompleted, toggleAllTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
