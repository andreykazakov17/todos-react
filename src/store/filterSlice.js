import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeFilter: 'All',
  },
  reducers: {
    onFilterChange(state, action) {
      return {
        activeFilter: action.payload,
      };
    },
  },
});

export const { onFilterChange } = filterSlice.actions;

export default filterSlice.reducer;
