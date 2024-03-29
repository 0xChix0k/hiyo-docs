import { configureStore } from '@reduxjs/toolkit';

import commonReducer from './commonSlice';
import dropdownReducer from './dropdownSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    dropdown: dropdownReducer,
  },
});
