import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@store/slices/userSlice';
import { Authapi } from './api/user/Authapi';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userSlice,
  [Authapi.reducerPath]: Authapi.reducer,
});
