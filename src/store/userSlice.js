import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
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
