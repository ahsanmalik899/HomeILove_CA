import { MYPostType } from "@/store/type/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const MainApi = createApi({
  reducerPath: 'MainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.15:3000/api/users/' }),
  endpoints: (builder) => ({
    getYourpost: builder.query< MYPostType,unknown>({
      query: (id) => ({
        url: `getYourFeeds/?id=${id}`,
        method: 'GET',
        
      }),
    }),
  }),
});


export const { useGetYourpostQuery } = MainApi;
