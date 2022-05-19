import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    email: '',
  },
  reducers: {
    registration(state, action) {
      state.email = action.payload.email;
    },
    setUser(state, action) {
      state.email = action.payload.email;
      state.userId = action.payload.id;
    },
    logout(state, action) {
      state.email = '';
      state.userId = '';
    },
  },
});

export const { registration, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
