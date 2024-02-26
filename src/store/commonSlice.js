import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    searchStr: '',
  },
  reducers: {
    setSearchStr(state, action) {
      state.searchStr = action.payload;
    },
  },
});

export default commonSlice.reducer;
export const selectCommon = (state) => state.common;

export const { setSearchStr } = commonSlice.actions;
