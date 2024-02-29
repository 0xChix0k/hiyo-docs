import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: { types: [], dates: [] },
  reducers: {
    setTypes(state, action) {
      state.types = action.payload;
    },
    setDates(state, action) {
      state.dates = action.payload;
    },
  },
});

export default dropdownSlice.reducer;
export const selectDropdown = (state) => state.dropdown;

export const { setTypes, setDates } = dropdownSlice.actions;
