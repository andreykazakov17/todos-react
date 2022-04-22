import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todosArr: [],
  },
  reducers: {
    addTodo(state, action) {
      return {
        todosArr: [...state.todosArr, action.payload],
      };
    },
    checkTodo(state, action) {
      return {
        todosArr: state.todosArr.map((item) =>
          item.id === action.payload ? { ...item, completed: !item.completed } : item,
        ),
      };
    },
    deleteTodo(state, action) {
      return {
        todosArr: state.todosArr.filter((todo) => todo.id !== action.payload),
      };
    },
    updateTodo(state, action) {
      return {
        todosArr: state.todosArr.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, text: action.payload.value };
          }
          return item;
        }),
      };
    },
    onClearCompleted(state) {
      return {
        todosArr: state.todosArr.filter((item) => !item.completed),
      };
    },
    toggleAllTodos(state) {
      if (state.todosArr.every((item) => item.completed)) {
        return {
          todosArr: state.todosArr.map((item) => ({ ...item, completed: false })),
        };
      }

      if (
        state.todosArr.every((item) => !item.completed) ||
        state.todosArr.some((item) => item.completed)
      ) {
        return {
          todosArr: state.todosArr.map((item) => ({ ...item, completed: true })),
        };
      }
    },
  },
});

export const { addTodo, checkTodo, deleteTodo, updateTodo, onClearCompleted, toggleAllTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
