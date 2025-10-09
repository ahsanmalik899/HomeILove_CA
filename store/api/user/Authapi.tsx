import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  changepassword,
  resetpass,
  siginpost,
  siginresponce,
  signuppost,
  verifyuser,
} from '@store/type/user/index';

export const Authapi = createApi({
  reducerPath: 'Authapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.10:3000/api/users/' }),
  endpoints: builder => ({
    Signup: builder.mutation<unknown, signuppost>({
      query: userdata => ({
        url: 'signup/',
        method: 'POST',
        body: userdata,
      }),
    }),
    Resetpass: builder.mutation<unknown, resetpass>({
      query: email => ({
        url: 'forgotpassword/',
        method: 'Post',
        body: email,
      }),
    }),
    Signin: builder.mutation<siginresponce, siginpost>({
      query: userdata => ({
        url: 'signin/',
        method: 'POST',
        body: userdata,
      }),
    }),
    ResendVaerification: builder.mutation<undefined, resetpass>({
      query: email => ({
        url: 'resendverficationmail',
        method: 'POST',
        body: email,
      }),
    }),
    ResendResetpaaword: builder.mutation<undefined, resetpass>({
      query: email => ({
        url: 'resendResetpasswordmail',
        method: 'POST',
        body: email,
      }),
    }),
    Verifyaccount: builder.mutation<undefined, verifyuser>({
      query: token => ({
        url: 'verify',
        method: 'POST',
        body: token,
      }),
    }),
    Setpassword: builder.mutation<undefined, changepassword>({
      query: data => ({
        url: 'verifyresetpass',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useResetpassMutation,
  useResendVaerificationMutation,
  useResendResetpaawordMutation,
  useVerifyaccountMutation,
  useSetpasswordMutation,
} = Authapi;
