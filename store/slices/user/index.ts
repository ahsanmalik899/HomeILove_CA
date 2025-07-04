/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import { siginresponce } from '@/store/type/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: siginresponce = {
  sweetghar_user_id: 0,
  name: '',
  email: '',
  mobile: '',
  city: '',
  user_type: '',
  logo: '',
  status: '',
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
