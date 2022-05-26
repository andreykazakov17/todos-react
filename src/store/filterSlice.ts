import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterState } from 'store/storeTypes/state';

const initialState: IFilterState = {
  activeFilter: 'All',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    onFilterChange(state, action: PayloadAction<string>) {
      state.activeFilter = action.payload;
    },
  },
});

export const { onFilterChange } = filterSlice.actions;

export default filterSlice.reducer;
