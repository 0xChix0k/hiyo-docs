import { createSlice } from '@reduxjs/toolkit';
import { genConfig } from 'react-nice-avatar';

export const initUser = {
  role: 'manager',
  avatar: genConfig(),
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
