import { combineReducers } from '@reduxjs/toolkit';
import Notificationsclice from '@store/slices/Notification/index';
import onboardingSclice from '@store/slices/onboarding/index';
import userdataSclice from '@store/slices/user/index';
import { Authapi } from './api/user/Authapi';
import { Google } from './api/user/Google';
import { MainApi } from './api/user/MainApi';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  onboarding: onboardingSclice,
  user: userdataSclice,
  notifiication: Notificationsclice,
  [Authapi.reducerPath]: Authapi.reducer,
  [MainApi.reducerPath]: MainApi.reducer,
  [Google.reducerPath]:Google.reducer,
});
