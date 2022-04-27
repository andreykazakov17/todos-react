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
        if (item._id === action.payload) {
          state.todosArr[index] = { ...item, completed: !item.completed };
        }
      });
    },
    deleteTodo(state, action) {
      const todosArr = current(state.todosArr);
      const index = todosArr.findIndex((todo) => todo._id === action.payload);
      state.todosArr.splice(index, 1);
    },
    updateTodo(state, action) {
      const todosArr = current(state.todosArr);
      const index = todosArr.findIndex((todo) => todo._id === action.payload._id);
      state.todosArr.splice(index, 1, action.payload);
    },
    clearCompleted(state, action) {
      state.todosArr = action.payload;
    },
    toggleAllTodos(state, action) {
      state.todosArr = action.payload;
    },
    updateIdsArr(state, action) {
      const idsArr = current(state.idsArr);

      if (!idsArr.includes(action.payload)) {
        state.idsArr = [...state.idsArr, action.payload];
      }
    },
  },
});

export const {
  addTodo,
  checkTodo,
  deleteTodo,
  updateTodo,
  clearCompleted,
  toggleAllTodos,
  updateIdsArr,
} = todoSlice.actions;

export default todoSlice.reducer;
