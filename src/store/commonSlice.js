import { createSlice } from '@reduxjs/toolkit';

export const initSearchData = {
  text: '',
  from: '',
  type: 'all',
  formId: 'all',
  dates: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState: { searchData: initSearchData },
  reducers: {
    setAllSearchData(state, action) {
      state.searchData = action.payload;
    },
    setSearchData(state, action) {
      const { field, value } = action.payload;
      state.searchData[field] = value;
    },
    resetSearchData(state) {
      state.searchData = initSearchData;
    },
  },
});

export default commonSlice.reducer;
export const selectCommon = (state) => state.common;

export const { setAllSearchData, setSearchData, resetSearchData } =
  commonSlice.actions;
