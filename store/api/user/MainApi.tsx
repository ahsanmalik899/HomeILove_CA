
import { ContentPostType, FeedResponse, GetPostType } from "@/store/type/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MainApi = createApi({
  reducerPath: 'MainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.11:3000/api/users/' }),
  endpoints: (builder) => ({
    getYourpost: builder.query< FeedResponse,GetPostType>({
      query: ({userid,page}) => ({
        url: `getYourFeeds/?userid=${userid}&page=${page}`,
        method: 'GET',
        
      }),
    }),
       getHomepost: builder.query< FeedResponse,GetPostType>({
      query: ({userid,page}) => ({
        url: `getHomeFeeds/?userid=${userid}&page=${page}`,
        method: 'GET',
        
      }),
    }),
     getContentpost: builder.query< FeedResponse,ContentPostType>({
      query: ({userid,page,type}) => ({
        url: `getContentFeeds/?userid=${userid}&page=${page}&type=${type}`,
        method: 'GET',
        
      }),
    }),
  }),
});


export const { useGetYourpostQuery ,
  useGetContentpostQuery,
  useGetHomepostQuery,
} = MainApi;
