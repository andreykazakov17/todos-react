import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    isLoading: false,
    email: '',
  },
  reducers: {
    registration(state, action) {
      state.email = action.payload.email;
    },
    login(state, action) {
      console.log(action.payload);
      state.email = action.payload.user.email;
      state.isAuth = action.payload.user.isAuth;
    },
    logout(state) {
      state.isAuth = false;
      state.email = '';
    },
    checkAuth(state, action) {
      state.isAuth = true;
      state.email = action.payload.email;
    },
    updateStore(state, action) {
      state.isAuth = action.payload.isAuth;
      state.email = action.payload.email;
    },
  },
});

export const { registration } = userSlice.actions;

export default userSlice.reducer;
