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
  initialState: { searchData: initSearchData, mesType: 'success' },
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
    setMesType(state, action) {
      state.mesType = action.payload;
    },
  },
});

export default commonSlice.reducer;
export const selectCommon = (state) => state.common;

export const { setAllSearchData, setSearchData, resetSearchData, setMesType } =
  commonSlice.actions;
