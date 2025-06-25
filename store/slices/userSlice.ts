/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface onboarding {
  isOnboarding: boolean;
}
const intialState: onboarding = {
  isOnboarding: false,
};
const onboardingsclice = createSlice({
  name: 'onboarding',
  intialState,
  reducers: {
    setonboarding(state, action: PayloadAction<boolean>) {
      state.isOnboarding = action.payload;
    },
  },
});
export const { onboarding } = onboardingsclice.actions;
export default onboardingsclice.reducer;
