import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userdata {
  sweetghar_user_id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  user_type: string;
  logo: string;
  status: string;
}
const initialState: userdata = {
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
    setusedata(state, action: PayloadAction<userdata>) {
      return action.payload;
    },
    resetUserData() {
      return initialState;
    },
  },
});
export const { setusedata, resetUserData } = userdataSclice.actions;
export default userdataSclice.reducer;
