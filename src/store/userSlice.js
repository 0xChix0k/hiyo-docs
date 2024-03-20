import { createSlice } from '@reduxjs/toolkit';

export const initUser = {
  CompanyNo: null,
  EmpNo: null,
  EmpName: null,
  Email: null,
  Department: null,
  Roles: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: initUser,
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user;

export const { setUser } = userSlice.actions;
