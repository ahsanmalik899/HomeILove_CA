import { combineReducers } from '@reduxjs/toolkit';
import onboardingSclice from '@store/slices/onboarding/index';
import userSlice from '@store/slices/userSlice';
import { Authapi } from './api/user/Authapi';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userSlice,
  onboarding: onboardingSclice,
  [Authapi.reducerPath]: Authapi.reducer,
});
