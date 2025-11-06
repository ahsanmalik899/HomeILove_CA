/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import { SignInResponse } from '@/store/type/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SignInResponse = {
        id:0,
        email: "",
        user_type: "",
        name: "",
        mobile: "",
        logo: "",
        status: ""
};

const userdataSclice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setusedata(state, action) {
      return action.payload;
    },
    setemail(state, action) {
      state.email = action.payload;
    },
    resetUserData() {
      return initialState;
    },
  },
});
export const { setusedata, resetUserData, setemail } = userdataSclice.actions;
export default userdataSclice.reducer;
