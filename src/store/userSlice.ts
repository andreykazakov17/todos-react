import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import { IUserState } from 'store/storeTypes/state';

export const initialState: IUserState = {
  userId: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registration(state, action: PayloadAction<IUser>) {
      state.email = action.payload.email;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.email = action.payload.email;
      state.userId = action.payload.id;
    },
    logout(state) {
      state.email = '';
      state.userId = '';
    },
  },
});

export const { registration, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
