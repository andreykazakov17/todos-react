import { createSlice, current } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todosArr: [],
    idsArr: [],
  },
  reducers: {
    getTodos(state = initialState, action) {
      state.todosArr = action.payload;
    },
    addTodo(state, action) {
      state.todosArr.push(action.payload);
    },
    checkTodo(state, action) {
      const todosArr = current(state.todosArr);
      todosArr.forEach((item, index) => {
        if (item.id === action.payload) {
          state.todosArr[index] = { ...item, completed: !item.completed };
        }
      });
    },
    deleteTodo(state, action) {
      const todosArr = current(state.todosArr);
      const index = todosArr.findIndex((todo) => todo.id === action.payload);
      state.todosArr.splice(index, 1);
    },
    updateTodo(state, action) {
      const todosArr = current(state.todosArr);
      const index = todosArr.findIndex((todo) => todo.id === action.payload.id);
      state.todosArr.splice(index, 1, action.payload);
    },
    clearCompleted(state, action) {
      state.todosArr = action.payload;
    },
    toggleAllTodos(state, action) {
      state.todosArr = action.payload;
    },
  },
});

export const todosArrSelector = (state) => state.todos.todosArr;

export const { addTodo, checkTodo, deleteTodo, updateTodo, clearCompleted, toggleAllTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
