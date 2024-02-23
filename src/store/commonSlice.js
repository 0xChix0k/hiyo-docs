import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    companyList: [],
    projectList: [],
    assignList: [],
    assMaList: [],
    workKindList: [],
    rdList: [],
    formAppList: [],
    homeHoverItem: null,
  },
  reducers: {
    setCompanyList(state, action) {
      state.companyList = action.payload;
    },
    setProjectList(state, action) {
      state.projectList = action.payload;
    },
    setAssignList(state, action) {
      state.assignList = action.payload;
    },
    setAssMaList(state, action) {
      state.assMaList = action.payload;
    },
    setWorkKindList(state, action) {
      state.workKindList = action.payload;
    },
    setRdList(state, action) {
      state.rdList = action.payload;
    },
    setFormAppList(state, action) {
      state.formAppList = action.payload;
    },
    setHomeHoverItem(state, action) {
      state.homeHoverItem = action.payload;
    }
  },
});

export default commonSlice.reducer;
export const selectCommon = (state) => state.common;

export const {
  setCompanyList,
  setAssignList,
  setAssMaList,
  setProjectList,
  setWorkKindList,
  setRdList,
  setFormAppList,
  setHomeHoverItem,
} = commonSlice.actions;
