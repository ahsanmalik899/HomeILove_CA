import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Authapi = createApi({
  reducerPath: 'Authapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.30:3000/api/users/' }),
  endpoints: builder => ({
    Signup: builder.mutation({
      query: userdata => ({
        url: 'signup/',
        method: 'POST',
        body: userdata,
      }),
    }),
    Signin: builder.mutation({
      query: userdata => ({
        url: 'signin/',
        method: 'POST',
        body: userdata,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = Authapi;
