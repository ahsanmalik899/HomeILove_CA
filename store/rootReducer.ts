import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@store/slices/userSlice';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userSlice,
});
