/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface onboarding {
  isOnboarding: boolean;
}
const initialState: onboarding = {
  isOnboarding: false,
};
const onboardingsclice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setonboarding(state, action: PayloadAction<boolean>) {
      state.isOnboarding = action.payload;
    },
  },
});
export const { setonboarding } = onboardingsclice.actions;

export const selectUserState = (state: RootState) => state.onboarding;
export default onboardingsclice.reducer;
