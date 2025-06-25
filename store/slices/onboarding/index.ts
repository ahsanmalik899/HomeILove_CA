/* eslint-disable no-param-reassign */
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

export default onboardingsclice.reducer;
