import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    isLoading: false,
    email: '',
  },
  reducers: {
    registration(state, action) {
      state.email = action.payload.email;
    },
    login(state, action) {
      state.email = action.payload.user.email;
      state.userId = action.payload.user.id;
    },
    checkAuth(state, action) {
      state.userId = true;
      state.email = action.payload.email;
    },
    updateStore(state, action) {
      state.userId = action.payload.id;
      state.email = action.payload.email;
    },
  },
});

export const { registration, login, checkAuth, updateStore } = userSlice.actions;

export default userSlice.reducer;
