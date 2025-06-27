/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

// Type for our state
export interface UserState {
  accessToken: string;
  data: {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    status: string;
  };
  authModal: boolean;
}

// Initial state
const initialState: UserState = {
  accessToken: '',
  data: {
    id: '',
    email: '',
    name: '',
    phone: '',
    role: '',
    status: '',
  },
  authModal: false,
};

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the authentication status
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setData } = userSlice.actions;

export const selectUserState = (state: RootState) => state.user;

export const selectUserAuthModal = (state: RootState) => state.user.authModal;

export default userSlice.reducer;
