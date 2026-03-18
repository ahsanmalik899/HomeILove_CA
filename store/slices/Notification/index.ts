/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

interface notification {
  NotificationCount: number;
}
const initialState: notification = {
  NotificationCount: 0,
};
const Notificationsclice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setNotificationCount(state, action) {
      state.NotificationCount = action.payload;
    },
  },
});
export const { setNotificationCount } = Notificationsclice.actions;

export const selectUserState = (state: RootState) => state.notifiication;
export default Notificationsclice.reducer;
